import styles from "./DividendHistoryTable.module.scss";
import EditDividendRow from "./EditDividendRow";
import AddDividendRow from "./AddDividendRow";
import { useState, useEffect } from "react";
import ZeroDividends from "./ZeroDividends";
import Pagination from "./Pagination";

function DividendHistoryTable({
  addingNewDividend,
  setAddingNewDividend,
  dividends,
  setDividends,
  setShowAlert,
  setActiveDividend,
  showZeroDividends,
  setShowZeroDividends,
}) {
  // State
  const [editState, setEditState] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPageDivs, setCurrentPageDivs] = useState([]);

  // Variables
  const divsPerPage = 50;
  const totalPages = Math.ceil(dividends.length / divsPerPage);

  useEffect(() => {
    createPageDivsArray();
  }, [page, dividends]);

  function createPageDivsArray() {
    let lastDivIndex = page * 50;
    let firstDivIndex = lastDivIndex - 50;
    const thisPageDivsArr = dividends.slice(firstDivIndex, lastDivIndex);
    setCurrentPageDivs(thisPageDivsArr);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  if (showZeroDividends) {
    return (
      <React.Fragment>
      <div className={styles.zeroDividendsContainer}>
        <div className={styles.tableHeadings}>
          <h6 className={styles.tableHeading}>Ticker</h6>
          <h6 className={styles.tableHeading}>Shares</h6>
          <h6 className={styles.tableHeading}>
            Cost Basis
            <br />
            (Avg Price / Share)
          </h6>
          <h6 className={styles.tableHeading}>Ex-Dividend Date</h6>
          <h6 className={styles.tableHeading}>Dividend Payout Date</h6>
          <h6 className={styles.tableHeading}>Dividend Amount</h6>
          <h6 className={styles.tableHeading}>Payout Frequency</h6>
        </div>
        <ZeroDividends
          setShowZeroDividends={setShowZeroDividends}
          setAddingNewDividend={setAddingNewDividend}
        />
      </div>

      <div className={styles.mobileZeroDividendsContainer}>
        Tap button to add a dividend!
      </div>
      </React.Fragment>
    );
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.tableHeadings}>
        <h6 className={styles.tableHeading}>Ticker</h6>
        <h6 className={styles.tableHeading}>Shares</h6>
        <h6 className={styles.tableHeading}>
          Cost Basis
          <br />
          (Avg Price / Share)
        </h6>
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
      {currentPageDivs.map((div) => (
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
      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
}

export default DividendHistoryTable;
