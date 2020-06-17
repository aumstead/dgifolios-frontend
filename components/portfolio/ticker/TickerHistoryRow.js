import styles from "./TickerHistoryRow.module.scss";
import { monthToStringAbbv } from "../../../utils/conversions";
import sort from "fast-sort";
import { v4 as uuidv4 } from "uuid";

function TickerHistoryRow({ year, dividends }) {
  let yearlyTotalDividends = 0;
  let totalCostBasis = 0;
  let costBasisAverage = 0;
  let netCostBasisAverage = 0;
  let totalNetCostBasis = 0;
  let totalYield = 0;
  let yieldAverage = 0;
  let costBasisDivisor = dividends.length;
  let netCostBasisDivisor = dividends.length;
  let yieldDivisor = dividends.length;
  let yearlyDividendGrowth = 0;

  dividends.forEach((div) => {
    yearlyTotalDividends += div.total;
    yearlyDividendGrowth += div.divGrowth;

    if (div.costBasis === null) {
      costBasisDivisor -= 1;
    }
    totalCostBasis += div.costBasis;

    if (div.netCostBasis === undefined) {
      netCostBasisDivisor -= 1;
    } else {
      totalNetCostBasis += div.netCostBasis;
    }

    if (!div.yield) {
      yieldDivisor -= 1;
    } else {
      totalYield += div.yield;
    }
  });

  yearlyTotalDividends = yearlyTotalDividends.toFixed(2);
  costBasisAverage = (totalCostBasis / costBasisDivisor).toFixed(2);
  netCostBasisAverage = (totalNetCostBasis / netCostBasisDivisor).toFixed(2);
  yieldAverage = (totalYield / yieldDivisor).toFixed(2);
  yearlyDividendGrowth = yearlyDividendGrowth.toFixed(2);

  return (
    <div className={styles.rowContainer}>
      <h4 className={styles.yearHeading}>{year}</h4>

      <div className={styles.yearFlexContainer}>
        <div className={styles.keyContainer}>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>
            Payment Date
          </div>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>
            Ex-Div Date
          </div>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>Shares</div>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>
            Amount/Share
          </div>
          <div className={`${styles.cellKey} ${styles.cellGreen}`}>Total</div>
          <div className={`${styles.cellKey} ${styles.cellRed}`}>
            Cost Basis/Share
          </div>
          <div className={`${styles.cellKey} ${styles.cellRed}`}>
            Net Cost Basis
          </div>
          <div className={`${styles.cellKey} ${styles.cellBlue}`}>
            Yield on Cost
          </div>
          <div className={`${styles.cellKey} ${styles.cellYellow}`}>
            Dividend Growth
          </div>
        </div>
        <div className={styles.tableContainer}>
          {/* array is sorted by divDate before mapping */}
          {sort(dividends)
            .asc((div) => div.divDate)
            .map((div) => (
              <div className={styles.divFlexContainer} key={uuidv4()}>
                <div className={styles.cellNormal}>
                  {monthToStringAbbv(div.month)} {div.day}
                </div>
                <div className={styles.cellNormal}>
                  {div.exDivDate ? monthToStringAbbv(div.exDivMonth) : ""}{" "}
                  {div.exDivDate ? div.exDivDay : " "}
                </div>

                <div className={styles.cellNormal}>{div.shares}</div>
                <div className={styles.cellNormal}>{div.amount}</div>
                <div className={styles.cellGreen}>{div.total}</div>
                <div className={styles.cellRed}>{div.costBasis || ""}</div>
                <div className={styles.cellRed}>{div.netCostBasis || ""}</div>
                <div className={styles.cellBlue}>
                  {div.yield ? `${div.yield}%` : ""}
                </div>
                <div className={styles.cellYellow}>
                  {div.divGrowth && `${div.divGrowth}%`}
                </div>
              </div>
            ))}
          <div className={styles.summaryContainer}>
            <div className={styles.cellSummaryBlue}>Yearly</div>
            <div className={styles.cellSummaryBlue}>Totals /</div>
            <div className={styles.cellSummaryBlue}>Averages</div>
            <div className={styles.cellSummaryBlue}></div>
            <div className={styles.cellGreen}>{yearlyTotalDividends}</div>
            <div className={styles.cellRed}>
              {isNaN(costBasisAverage) ? "" : `${costBasisAverage}`}
            </div>
            <div className={styles.cellRed}>
              {isNaN(netCostBasisAverage) ? "" : `${netCostBasisAverage}`}
            </div>
            <div className={styles.cellBlue}>
              {isNaN(yieldAverage) ? "" : `${yieldAverage}%`}
            </div>
            <div className={styles.cellYellow}>
              {isNaN(yearlyDividendGrowth) ? "" : `${yearlyDividendGrowth}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TickerHistoryRow;
