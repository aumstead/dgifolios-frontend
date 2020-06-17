import styles from "./DividendHistoryTable.module.scss";
import EditDividendRow from "./EditDividendRow";
import AddDividendRow from "./AddDividendRow";
import { useState } from 'react'
import ZeroDividends from './ZeroDividends'

function DividendHistoryTable({
  addingNewDividend,
  setAddingNewDividend,
  dividends,
  setDividends,
  setShowAlert,
  setActiveDividend,
  showZeroDividends,
  setShowZeroDividends
}) {
  // State
  const [editState, setEditState] = useState(false)

  if (showZeroDividends) {
    return (
    <div>
      <div className={styles.tableHeadings}>
        <h6 className={styles.tableHeading}>Ticker</h6>
        <h6 className={styles.tableHeading}>Shares</h6>
        <h6 className={styles.tableHeading}>Cost Basis<br/>(Avg Price / Share)</h6>
        <h6 className={styles.tableHeading}>Ex-Dividend Date</h6>
        <h6 className={styles.tableHeading}>Dividend Payout Date</h6>
        <h6 className={styles.tableHeading}>Dividend Amount</h6>
        <h6 className={styles.tableHeading}>Payout Frequency</h6>
      </div>
      <ZeroDividends setShowZeroDividends={setShowZeroDividends} setAddingNewDividend={setAddingNewDividend} />
    </div>
    )
  }

  return (
    <div>
      <div className={styles.tableHeadings}>
        <h6 className={styles.tableHeading}>Ticker</h6>
        <h6 className={styles.tableHeading}>Shares</h6>
        <h6 className={styles.tableHeading}>Cost Basis<br/>(Avg Price / Share)</h6>
        <h6 className={styles.tableHeading}>Ex-Dividend Date</h6>
        <h6 className={styles.tableHeading}>Dividend Payout Date</h6>
        <h6 className={styles.tableHeading}>Dividend Amount</h6>
        <h6 className={styles.tableHeading}>Payout Frequency</h6>
      </div>

      {addingNewDividend && (
        <AddDividendRow
          setDividends={setDividends}
          setAddingNewDividend={setAddingNewDividend}
        />
      )}
      {dividends.map((div) => (
        <EditDividendRow
          mongoId={div._id}
          key={div._id}
          ticker={div.ticker}
          shares={div.shares}
          costBasis={div.costBasis}
          divDate={div.divDate}
          exDivDate={div.exDivDate}
          amount={div.amount}
          frequency={div.frequency}
          setDividends={setDividends}
          addingNewDividend={addingNewDividend}
          setShowAlert={setShowAlert}
          setActiveDividend={setActiveDividend}
          editState={editState}
          setEditState={setEditState}
        />
      ))}
    </div>
  );
}

export default DividendHistoryTable;
