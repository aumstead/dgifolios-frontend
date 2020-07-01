import styles from "./AddPositionRow.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../../../utils/baseUrl";
import catchErrors from "../../../utils/catchErrors";
import Tooltip from "../../../components/styled/Tooltip";
import { validateIsGreaterThanZero } from '../../../utils/validation'

function AddPositionRow({
  setAddingNewTicker,
  setPortfolio,
  portfolio,
  makeCalculations
}) {
  const [newTicker, setNewTicker] = useState({
    ticker: "",
    shares: "",
    costBasis: "",
  });
  const [loading, setLoading] = useState(false);
  const [showTickerExistsTooltip, setShowTickerExistsTooltip] = useState(false);
  const [showTickerPresentTooltip, setShowTickerPresentTooltip] = useState(false);
  const [showSharesTooltip, setShowSharesTooltip] = useState(false);
  const [showCostBasisTooltip, setShowCostBasisTooltip] = useState(false);

  // variable for clearTimeout cleanup function
  let timeout;

  useEffect(() => {
    return clearTimeout(timeout)
  }, [])

  function handleChange(event) {
    const { name, value } = event.target;
    setNewTicker((prevState) => {
      if (name === "ticker") {
        return { ...prevState, [name]: value.toUpperCase() };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  }

  async function handleSave() {
    try {
      setLoading(true);
      // validate input data
      const positionExists = validateTicker("exists");
      if (positionExists) {
        return handleTooltip("tickerExists");
      }
      const tickerPresent = validateTicker("present")
      if (!tickerPresent) {
        return handleTooltip("tickerPresent")
      }
      const { shares, costBasis } = newTicker
      const sharesValid = validateIsGreaterThanZero(shares);
      if (!sharesValid) {
        return handleTooltip("shares")
      }
      const costBasisValid = validateIsGreaterThanZero(costBasis)
      if (!costBasisValid) {
        return handleTooltip("costBasis")
      }
      const url = `${baseUrl}/portfolio`;
      const payload = { ...newTicker };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const response = await axios.post(url, payload, headers);
      const data = makeCalculations(response.data)
      setPortfolio(data)
      setAddingNewTicker(false);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
      setNewTicker((prevState) => ({
        ticker: "",
        shares: "",
        costBasis: "",
      }));
    }
  }

  function validateTicker(type) {
    const { ticker } = newTicker;
    if (type === "exists") {
      let positionExists;
      portfolio.forEach((position) => {
        if (position.ticker === ticker) {
          positionExists = true;
        }
      });
      return positionExists;
    } else if (type === "present") {
      if (ticker === "") {
        return false;
      } else {
        return true;
      }
    }
  }

  function handleTooltip(type) {
    switch (type) {
      case "tickerExists":
        setShowTickerExistsTooltip(true);
        timeout = setTimeout(() => {
          setShowTickerExistsTooltip(false);
        }, 3000);
        break;
      case "tickerPresent":
        setShowTickerPresentTooltip(true)
        timeout = setTimeout(() => {
          setShowTickerPresentTooltip(false);
        }, 3000);
        break;
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
    <div className={styles.newTickerRow}>
      {/* Loading ellipsis animation */}
      {loading && (
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={styles.inputContainer}>
        <input
          onChange={handleChange}
          name="ticker"
          className={
            loading ? `${styles.input} ${styles.loading}` : styles.input
          }
          type="text"
          value={newTicker.ticker}
          disabled={loading}
          autoComplete="off"
          autoFocus
        />
        {showTickerExistsTooltip && (
          <Tooltip text="Ticker already exists. Try editing below." />
        )}
        {showTickerPresentTooltip && (
          <Tooltip text="Ticker required." />
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          onChange={handleChange}
          name="shares"
          className={
            loading ? `${styles.input} ${styles.loading}` : styles.input
          }
          type="number"
          value={newTicker.shares}
          disabled={loading}
          autoComplete="off"
        />
        {showSharesTooltip && (
          <Tooltip text="Invalid amount." />
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          onChange={handleChange}
          name="costBasis"
          className={
            loading ? `${styles.input} ${styles.loading}` : styles.input
          }
          type="number"
          value={newTicker.costBasis}
          disabled={loading}
          autoComplete="off"
        />
        {showCostBasisTooltip && (
          <Tooltip text="Invalid amount." />
        )}
      </div>
      <button
        onClick={handleSave}
        className={
          loading
            ? `${styles.button} ${styles.buttonSave} ${styles.loading} ${styles.buttonSaveDisabled}`
            : `${styles.button} ${styles.buttonSave}`
        }
        disabled={loading}
      >
        Save
      </button>
      <button
        onClick={() => setAddingNewTicker((prevState) => !prevState)}
        className={
          loading
            ? `${styles.button} ${styles.buttonCancel} ${styles.loading} ${styles.buttonCancelDisabled}`
            : `${styles.button} ${styles.buttonCancel}`
        }
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddPositionRow;
