import styles from "./EditDividendRow.module.scss";
import { useState, useEffect, useContext } from "react";
import Tooltip from "../../styled/Tooltip";
import { validateIsGreaterThanZero } from "../../../utils/validation";
import baseUrl from "../../../utils/baseUrl";
import cookie from "js-cookie";
import axios from "axios";
import Link from "next/link";
import DividendContext from '../../../contexts/dividends/DividendContext'

const INITIAL_FORM_VALUES = {
  ticker: '',
  shares: '',
  costBasis: '',
  exDivDate: '',
  divDate: '',
  amount: '',
  frequency: ''
}

function EditDividendRow({
  ticker,
  shares,
  costBasis,
  exDivDate,
  divDate,
  amount,
  frequency,
  mongoId,
  setDividends,
  addingNewDividend,
  setShowAlert,
  setActiveDividend,
  editState,
  setEditState
}) {
  // Context
  const dividendContext = useContext(DividendContext)
  const { makeCalculations, calculateAllTimeDividends } = dividendContext

  // States
  const [showEditInterface, setShowEditInterface] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editInputs, setEditInputs] = useState({ INITIAL_FORM_VALUES });
  const [showTickerTooltip, setShowTickerTooltip] = useState(false);
  const [showSharesTooltip, setShowSharesTooltip] = useState(false);
  const [showDivDateTooltip, setShowDivDateTooltip] = useState(false);
  const [showAmountTooltip, setShowAmountTooltip] = useState(false);

  // variable for clearTimeout cleanup function
  let timeout;

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  function handleCancelClick() {
    setShowEditInterface((prevState) => !prevState);
    setEditState((prevState) => !prevState);
  }

  function handleDeleteClick() {
    setShowAlert(true);
    setActiveDividend({ mongoId, ticker });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditInputs((prevState) => {
      if (name === "ticker") {
        return { ...prevState, [name]: value.toUpperCase() };
      } else if (name === "divDate" || name === "exDivDate" || name === "frequency") {
        return { ...prevState, [name]: value };
      // } else if (name === "costBasis") {
      //   return { ...prevState, [name]: Number(value)}
      } else {
        return { ...prevState, [name]: value };
      }
    });
  }

  function handleEditClick() {
    setShowEditInterface((prevState) => !prevState);
    setEditState((prevState) => !prevState);
    setEditInputs({
      ticker,
      shares,
      costBasis,
      exDivDate,
      divDate,
      amount,
      frequency
    });
  }

  function handleTooltip(type) {
    switch (type) {
      case "ticker":
        setShowTickerTooltip(true);
        timeout = setTimeout(() => {
          setShowTickerTooltip(false);
        }, 3000);
        break;
      case "shares":
        setShowSharesTooltip(true);
        timeout = setTimeout(() => {
          setShowSharesTooltip(false);
        }, 3000);
        break;
      case "divDate":
        setShowDivDateTooltip(true);
        timeout = setTimeout(() => {
          setShowDivDateTooltip(false);
        }, 3000);
        break;
      case "amount":
        setShowAmountTooltip(true);
        timeout = setTimeout(() => {
          setShowAmountTooltip(false);
        }, 3000);
        break;
      default:
        console.error("Error in switch statement.");
        break;
    }
  }

  async function handleSave() {
    // validate inputs
    const {
      ticker,
      shares,
      costBasis,
      exDivDate,
      divDate,
      amount,
      frequency
    } = editInputs;

    const tickerValid = ticker.length > 0;
    if (!tickerValid) {
      return handleTooltip("ticker");
    }

    const sharesValid = validateIsGreaterThanZero(shares);
    if (!sharesValid) {
      return handleTooltip("shares");
    }

    const divDateValid = divDate.length > 0;
    if (!divDateValid) {
      return handleTooltip("divDate");
    }

    const amountValid = validateIsGreaterThanZero(amount);
    if (!amountValid) {
      return handleTooltip("amount");
    }

    try {
      setLoading(true);
      const url = `${baseUrl}/dividends`;
      const token = cookie.get("token");
      const payload = {
        ticker,
        shares,
        costBasis,
        exDivDate,
        divDate,
        amount,
        frequency,
        mongoId,
      };
      const headers = { headers: { Authorization: token } };
      const response = await axios.patch(url, payload, headers);
      const data = makeCalculations(response.data)
      calculateAllTimeDividends(response.data)
      setDividends(data);
      setShowEditInterface(false);
      setEditState(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setEditInputs((prevState) => ({
        ...prevState,
        ticker: "",
        shares: "",
        exDivDate: "",
        divDate: "",
        amount: "",
        frequency: ""
      }));
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

      <Link
        href={`/portfolio/[ticker]?ticker=${ticker}`}
        as={`/portfolio/${ticker}`}
      >
        <p className={styles.ticker}>{ticker}</p>
      </Link>
      <p>{shares}</p>
      <p>{costBasis}</p>
      <p>{exDivDate}</p>
      <p>{divDate}</p>
      <p>{amount}</p>
      <p className={styles.frequency}>{frequency}</p>

      {/* display disabled buttons when adding a new dividend */}
      {addingNewDividend || editState ? (
        <button
          disabled
          className={`${styles.button} ${styles.buttonEdit} ${styles.buttonEditDisabled}`}
        >
          Edit
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles.buttonEdit}`}
          onClick={handleEditClick}
        >
          Edit
        </button>
      )}

      {addingNewDividend || editState ? (
        <button
          disabled
          className={`${styles.button} ${styles.buttonDelete} ${styles.buttonDeleteDisabled}`}
        >
          Delete
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles.buttonDelete}`}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}

      {/* input ticker */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="string"
            onChange={handleChange}
            name="ticker"
            value={editInputs.ticker}
            className={
              loading
                ? `${styles.input} ${styles.inputSmall} ${styles.loading}`
                : `${styles.input} ${styles.inputSmall}`
            }
            disabled={loading}
            autoComplete="off"
            autoFocus
          />
          {showTickerTooltip && (
            <Tooltip
              text="Ticker required"
              style={{ top: "-3.3rem", left: "3.2rem" }}
            />
          )}
        </div>
      )}

      {/* input shares */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="number"
            onChange={handleChange}
            name="shares"
            value={editInputs.shares}
            className={
              loading
                ? `${styles.input} ${styles.inputSmall} ${styles.loading}`
                : `${styles.input} ${styles.inputSmall}`
            }
            disabled={loading}
            autoComplete="off"
          />
          {showSharesTooltip && (
            <Tooltip
              text="Invalid amount"
              style={{ top: "-3.3rem", left: "3.2rem" }}
            />
          )}
        </div>
      )}

      {/* input cost basis */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="number"
            onChange={handleChange}
            name="costBasis"
            value={editInputs.costBasis}
            className={
              loading
                ? `${styles.input} ${styles.inputSmall} ${styles.loading}`
                : `${styles.input} ${styles.inputSmall}`
            }
            disabled={loading}
            autoComplete="off"
          />
        </div>
      )}

      {/* input exDivDate */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="date"
            onChange={handleChange}
            name="exDivDate"
            value={editInputs.exDivDate}
            className={
              loading ? `${styles.input} ${styles.loading}` : `${styles.input}`
            }
            disabled={loading}
            autoComplete="off"
          />
        </div>
      )}

      {/* input divDate */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="date"
            onChange={handleChange}
            name="divDate"
            value={editInputs.divDate}
            className={
              loading ? `${styles.input} ${styles.loading}` : `${styles.input}`
            }
            disabled={loading}
            autoComplete="off"
          />
          {showDivDateTooltip && (
            <Tooltip
              text="Field required"
              style={{ top: "-3.3rem", left: "5rem" }}
            />
          )}
        </div>
      )}

      {/* input amount */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <input
            type="number"
            onChange={handleChange}
            name="amount"
            value={editInputs.amount}
            className={
              loading
                ? `${styles.input} ${styles.inputSmall} ${styles.loading}`
                : `${styles.input} ${styles.inputSmall}`
            }
            disabled={loading}
            autoComplete="off"
          />
          {showAmountTooltip && (
            <Tooltip
              text="Invalid amount"
              style={{ top: "-3.3rem", left: "3.2rem" }}
            />
          )}
        </div>
      )}

      {/* select frequency */}
      {showEditInterface && (
        <div className={`${styles.inputContainer}`}>
          <select
            onChange={handleChange}
            name="frequency"
            value={editInputs.frequency}
            disabled={loading}
          >
            <option value="quarterly" selected>Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="biannually">Biannually</option>
            <option value="annually">One-time</option>
          </select>
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

export default EditDividendRow;
