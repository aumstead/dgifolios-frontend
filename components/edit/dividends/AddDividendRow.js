import styles from "./AddDividendRow.module.scss";
import { useState, useContext } from "react";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import cookie from "js-cookie";
import catchErrors from "../../../utils/catchErrors";
import DividendContext from '../../../contexts/dividends/DividendContext'


function AddDividendRow({
  setAddingNewDividend,
  setDividends
}) {
  // Context
  const dividendContext = useContext(DividendContext)
  const { makeCalculations, calculateAllTimeDividends } = dividendContext

  const [newDividend, setNewDividend] = useState({
    ticker: "",
    shares: "",
    costBasis: "",
    divDate: "",
    exDivDate: "",
    amount: "",
    frequency: "quarterly",
  });
  const [loading, setLoading] = useState(false);

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
        return { ...prevState, [name]: Number(value) };
      }
    });
  }

  async function handleSave() {
    try {
      setLoading(true);
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const url = `${baseUrl}/dividends`;
      const payload = {
        ...newDividend,
      };
      const response = await axios.post(url, payload, headers);
      const data = makeCalculations(response.data)
      calculateAllTimeDividends(response.data)
      setDividends(data);
      setAddingNewDividend(false);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setNewDividend({
        ticker: "",
        shares: "",
        divDate: "",
        exDivDate: "",
        amount: "",
        frequency: "quarterly"
      });
      setLoading(false);
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
      <div>
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
      </div>
      <div>
        <input
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.shares}
          onChange={handleChange}
          name="shares"
          type="number"
          autoComplete="off"
          disabled={loading}
        />
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
      <div>
        <input
          className={styles.input}
          value={newDividend.divDate}
          onChange={handleChange}
          name="divDate"
          type="date"
          disabled={loading}
        />
      </div>
      <div>
        <input
          className={`${styles.input} ${styles.inputSmall}`}
          value={newDividend.amount}
          onChange={handleChange}
          name="amount"
          type="number"
          autoComplete="off"
          disabled={loading}
        />
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
