import styles from "./AddDividendRow.module.scss";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import cookie from "js-cookie";
import catchErrors from "../../../utils/catchErrors";
import DividendContext from "../../../contexts/dividends/DividendContext";
import { validateIsGreaterThanZero } from "../../../utils/validation";
import Tooltip from "../../styled/Tooltip";

const INITIAL_FORM_VALUES = {
  ticker: "",
  shares: "",
  costBasis: "",
  exDivDate: "",
  divDate: "",
  amount: "",
  frequency: "quarterly",
};

function AddDividendRow({ setAddingNewDividend, setDividends }) {
  // Context
  const dividendContext = useContext(DividendContext);
  const { makeCalculations, calculateAllTimeDividends } = dividendContext;

  const [newDividend, setNewDividend] = useState(INITIAL_FORM_VALUES);
  const [loading, setLoading] = useState(false);

  // States
  const [showTickerTooltip, setShowTickerTooltip] = useState(false);
  const [showSharesTooltip, setShowSharesTooltip] = useState(false);
  const [showDivDateTooltip, setShowDivDateTooltip] = useState(false);
  const [showAmountTooltip, setShowAmountTooltip] = useState(false);

  // variable for clearTimeout cleanup function
  let timeout;

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewDividend((prevState) => {
      if (name === "ticker") {
        return { ...prevState, [name]: value.toUpperCase() };
      } else if (
        name === "divDate" ||
        name === "exDivDate" ||
        name === "frequency"
      ) {
        return { ...prevState, [name]: value };
      } else {
        return { ...prevState, [name]: value };
      }
    });
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
      frequency,
    } = newDividend;

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
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const url = `${baseUrl}/dividends`;
      const payload = {
        ticker,
        shares,
        costBasis,
        exDivDate,
        divDate,
        amount,
        frequency,
      };
      const response = await axios.post(url, payload, headers);
      console.log(response);
      const data = makeCalculations(response.data);
      calculateAllTimeDividends(response.data);
      setDividends(data);
      setAddingNewDividend(false);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setNewDividend(INITIAL_FORM_VALUES);
      setLoading(false);
      // scroll to top for mobile
      window.scrollTo(0, 0)
    }
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

  return (
    <div className={styles.newDividendRow}>
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
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.ticker}
          onChange={handleChange}
          name="ticker"
          type="text"
          autoComplete="off"
          disabled={loading}
          autoFocus
        />
        {showTickerTooltip && (
          <Tooltip
            text="Ticker required"
            style={{ top: "-3.3rem", left: "3.2rem" }}
          />
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.shares}
          onChange={handleChange}
          name="shares"
          type="number"
          autoComplete="off"
          disabled={loading}
        />
        {showSharesTooltip && (
          <Tooltip
            text="Invalid amount"
            style={{ top: "-3.3rem", left: "3.2rem" }}
          />
        )}
      </div>
      <div>
        <input
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.costBasis}
          onChange={handleChange}
          name="costBasis"
          type="number"
          autoComplete="off"
          disabled={loading}
        />
      </div>
      <div>
        <input
          className={styles.input}
          value={newDividend.exDivDate}
          onChange={handleChange}
          name="exDivDate"
          type="date"
          disabled={loading}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={newDividend.divDate}
          onChange={handleChange}
          name="divDate"
          type="date"
          disabled={loading}
        />
        {showDivDateTooltip && (
          <Tooltip
            text="Field required"
            style={{ top: "-3.3rem", left: "5rem" }}
          />
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.amount}
          onChange={handleChange}
          name="amount"
          type="number"
          autoComplete="off"
          disabled={loading}
        />
        {showAmountTooltip && (
          <Tooltip
            text="Invalid amount"
            style={{ top: "-3.3rem", left: "3.2rem" }}
          />
        )}
      </div>
      <div>
        <select
          // className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.frequency}
          onChange={handleChange}
          name="frequency"
          disabled={loading}
        >
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
          <option value="biannually">Biannually</option>
          <option value="annually">One-time</option>
        </select>
      </div>
      <button
        className={
          loading
            ? `${styles.button} ${styles.buttonSave} ${styles.buttonSaveDisabled}`
            : `${styles.button} ${styles.buttonSave}`
        }
        onClick={handleSave}
        disabled={loading}
      >
        Save
      </button>

      <button
        className={
          loading
            ? `${styles.button} ${styles.buttonCancel} ${styles.buttonCancelDisabled}`
            : `${styles.button} ${styles.buttonCancel}`
        }
        onClick={() => setAddingNewDividend(false)}
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddDividendRow;
