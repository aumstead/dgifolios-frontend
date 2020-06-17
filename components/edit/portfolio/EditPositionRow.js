import { useState, useEffect } from "react";
import styles from "./EditPositionRow.module.scss";
import baseUrl from "../../../utils/baseUrl";
import cookie from "js-cookie";
import axios from "axios";
import Tooltip from "../../styled/Tooltip";
import { validateIsGreaterThanZero } from "../../../utils/validation";
import Link from "next/link";

function EditPositionRow({
  mongoId,
  ticker,
  shares,
  costBasis,
  addingNewTicker,
  editState,
  setEditState,
  setShowAlert,
  setActivePosition,
  setPortfolio,
  makeCalculations
}) {
  const [showEditInterface, setShowEditInterface] = useState(false);
  const [editInputs, setEditInputs] = useState({
    shares: "",
    costBasis: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSharesTooltip, setShowSharesTooltip] = useState(false);
  const [showCostBasisTooltip, setShowCostBasisTooltip] = useState(false);

  // variable for clearTimeout cleanup function
  let timeout;

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  function handleEditClick() {
    setShowEditInterface((prevState) => !prevState);
    setEditState((prevState) => !prevState);
    setActivePosition({ mongoId });
  }

  function handleCancelClick() {
    setShowEditInterface((prevState) => !prevState);
    setEditState((prevState) => !prevState);
  }

  function handleDeleteClick() {
    setShowAlert(true);
    setActivePosition({ mongoId, ticker });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditInputs((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  async function handleSave() {
    // Validate inputs
    const { shares, costBasis } = editInputs;
    const sharesValid = validateIsGreaterThanZero(shares);
    if (!sharesValid) {
      return handleTooltip("shares");
    }
    const costBasisValid = validateIsGreaterThanZero(costBasis);
    if (!costBasisValid) {
      return handleTooltip("costBasis");
    }

    try {
      setLoading(true);
      const url = `${baseUrl}/portfolio`;
      const token = cookie.get("token");
      const payload = {
        shares,
        costBasis,
        mongoId,
      };
      const headers = { headers: { Authorization: token } };
      const response = await axios.patch(url, payload, headers);
      // By making calculations here, state is updated in context and changing routes is not an issue
      const data = makeCalculations(response.data)
      setPortfolio(data);
      setShowEditInterface(false);
      setEditState(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setEditInputs((prevState) => ({
        ...prevState,
        shares: "",
        costBasis: "",
      }));
    }
  }

  function handleTooltip(type) {
    switch (type) {
      case "shares":
        setShowSharesTooltip(true);
        timeout = setTimeout(() => {
          setShowSharesTooltip(false);
        }, 3000);
        break;
      case "costBasis":
        setShowCostBasisTooltip(true);
        timeout = setTimeout(() => {
          setShowCostBasisTooltip(false);
        }, 3000);
        break;
      default:
        console.error("Error in switch statement.");
        break;
    }
  }

  return (
    <div className={styles.row}>
      {/* Loading ellipsis animation */}
      {loading && (
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {/* ticker */}
      <Link
        href={`/portfolio/[ticker]?ticker=${ticker}`}
        as={`/portfolio/${ticker}`}
      >
        <p className={styles.ticker}>{ticker}</p>
      </Link>

      {/* shares */}
      <p className={styles.shares}>{shares}</p>

      {/* cost basis */}
      <p className={styles.costBasis}>{costBasis}</p>

      {/* edit button */}
      {showEditInterface || addingNewTicker || editState ? (
        <button
          disabled
          className={`${styles.button} ${styles.buttonEdit} ${styles.buttonEditDisabled}`}
        >
          Edit
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className={`${styles.button} ${styles.buttonEdit}`}
        >
          Edit
        </button>
      )}

      {/* delete button */}
      {showEditInterface || addingNewTicker || editState ? (
        <button
          disabled
          className={`${styles.button} ${styles.buttonDelete} ${styles.buttonDeleteDisabled}`}
        >
          Delete
        </button>
      ) : (
        <button
          onClick={handleDeleteClick}
          className={`${styles.button} ${styles.buttonDelete}`}
        >
          Delete
        </button>
      )}

      {/* input shares */}
      {showEditInterface && (
        <div className={`${styles.inputContainer} ${styles.inputShares}`}>
          <input
            type="number"
            onChange={handleChange}
            name="shares"
            value={editInputs.shares}
            className={
              loading ? `${styles.input} ${styles.loading}` : `${styles.input}`
            }
            disabled={loading}
            autoComplete="off"
          />
          {showSharesTooltip && <Tooltip text="Invalid amount" />}
        </div>
      )}

      {/* input cost basis */}
      {showEditInterface && (
        <div className={`${styles.inputContainer} ${styles.inputCostBasis}`}>
          <input
            type="number"
            onChange={handleChange}
            name="costBasis"
            value={editInputs.costBasis}
            className={
              loading ? `${styles.input} ${styles.loading}` : `${styles.input}`
            }
            disabled={loading}
            autoComplete="off"
          />
          {showCostBasisTooltip && <Tooltip text="Invalid amount" />}
        </div>
      )}
      {/* save button */}
      {showEditInterface && (
        <button
          disabled={loading}
          onClick={handleSave}
          className={
            loading
              ? `${styles.button} ${styles.buttonSave} ${styles.loading} ${styles.buttonSaveDisabled}`
              : `${styles.button} ${styles.buttonSave}`
          }
        >
          Save
        </button>
      )}
      {/* cancel button */}
      {showEditInterface && (
        <button
          disabled={loading}
          onClick={handleCancelClick}
          className={
            loading
              ? `${styles.button} ${styles.buttonCancel} ${styles.loading} ${styles.buttonCancelDisabled}`
              : `${styles.button} ${styles.buttonCancel}`
          }
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default EditPositionRow;
