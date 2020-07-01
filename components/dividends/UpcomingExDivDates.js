import { useState, useEffect } from "react";
import UpcomingExDivStock from "./UpcomingExDivStock";
import styles from "./UpcomingExDivDates.module.scss";
import { monthToStringAbbv } from "../../utils/conversions";
import sort from "fast-sort";

function UpcomingExDivDates({ dividends }) {
  const [possibleStocks, setPossibleStocks] = useState([]);

  useEffect(() => {
    manipulateData();
  }, []);

  function manipulateData() {
    const today = new Date();
    let possibleStocks = [];

    dividends.forEach((div) => {
      if (div.frequency === "quarterly") {
        let exDivDateObj = new Date(div.exDivDate);
        let estimatedDate = new Date(
          exDivDateObj.setMonth(exDivDateObj.getMonth() + 3)
        );

        // get one month out for comparison
        let oneMonthOut = new Date();
        oneMonthOut.setMonth(oneMonthOut.getMonth() + 1);
        if (today < estimatedDate && estimatedDate < oneMonthOut) {
          possibleStocks.push(div);
        }
      }
    });

    // sort possible stocks
    sort(possibleStocks).asc((div) => div.exDivDate);

    // add estimated ex-div date for each possible stock
    possibleStocks.forEach((div) => {
      if (div.frequency === "quarterly") {
        let exDivDate = new Date(div.exDivDate);
        // create estimated ex-div date
        exDivDate.setMonth(exDivDate.getMonth() + 3);
        exDivDate =
          monthToStringAbbv(exDivDate.getMonth()) + " " + exDivDate.getDate();
        div.estimatedExDivDate = exDivDate;
      }
    });

    setPossibleStocks(possibleStocks);
  }
  return (
    <div className={styles.componentContainer}>
      {possibleStocks.length === 0 ? (
        <span>None</span>
      ) : (
        <div className={styles.keyContainer}>
          <div className={`${styles.cellKey} ${styles.ticker}`}>Ticker</div>
          <div
            className={`${styles.cellKey} ${styles.cellNormal} ${styles.cellPrevious}`}
          >
            Previous ex-div
          </div>
          <div
            className={`${styles.cellKey} ${styles.cellNormal} ${styles.cellEstimated}`}
          >
            Estimated ex-div
          </div>
        </div>
      )}
      <div className={styles.dataContainer}>
        {possibleStocks.map((stock) => (
          <UpcomingExDivStock
            ticker={stock.ticker}
            prevExDivDate={stock.exDivDate}
            estimatedExDivDate={stock.estimatedExDivDate}
            key={stock._id}
          />
        ))}
      </div>
    </div>
  );
}

export default UpcomingExDivDates;
