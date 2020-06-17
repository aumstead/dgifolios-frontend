import styles from "./ProfileMonthRow.module.scss";
import { monthToString } from "../../../utils/conversions";
import { monthToStringAbbv } from "../../../utils/conversions";
import sort from "fast-sort";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

function ProfileMonthRow({ monthNumber, year, monthArray }) {
  // Variables for calculations
  let netCostBasisTotal = 0;
  let monthlyTotalDividends = 0;
  let divsWithYieldData = 0;
  let yieldTotal = 0;
  // unusualFrequency array used for weighted yield
  // let unusualFrequency = [];

  // Make calculations
  monthArray.forEach((div) => {
    // Sum of dividends for the month
    monthlyTotalDividends += div.total;
    // Sum of invested capital for the month
    if (div.netCostBasis) {
      netCostBasisTotal += div.netCostBasis;
    }
    // Sums of data to calculate average dividend yield
    if (div.yield) {
      divsWithYieldData++;
      yieldTotal += div.yield;
    }

    // Create weighted yield unusualFrequency array
    // if (!div.frequency === "quarterly") {
    //   unusualFrequency.push(div);
    // }
  });

  netCostBasisTotal = Number(netCostBasisTotal.toFixed(2));
  monthlyTotalDividends = Number(monthlyTotalDividends.toFixed(2));
  const avgYield = Number((yieldTotal / divsWithYieldData).toFixed(2));

  // Weighted yield calculations
  // let weightedAdjustedNetCostBasis = 0;
  // let weightedAdjustedCostBasis = 0;
  // let weightedYield = 0;
  // if (unusualFrequency.length > 0) {
  //   unusualFrequency.forEach((div) => {
  //     if (div.frequency === "monthly") {
  //       weightedAdjustedNetCostBasis = netCostBasisTotal - div.netCostBasis;
  //       weightedAdjustedCostBasis = div.netCostBasis / 12;
  //     }
  //   });
  //   weightedYield = (
  //     (monthlyTotalDividends / (weightedAdjustedNetCostBasis / 4) +
  //       weightedAdjustedCostBasis) *
  //     100
  //   ).toFixed(2);
  // } else {
  //   weightedYield = (
  //     (monthlyTotalDividends / (netCostBasisTotal / 4)) *
  //     100
  //   ).toFixed(2);
  // }

  return (
    <div>
      <h4 className={styles.monthHeading}>
        {monthToString(monthNumber)} {year}
      </h4>
      <div className={styles.monthFlexContainer}>
        <div className={styles.keyContainer}>
          <div className={`${styles.cellKey} ${styles.ticker}`}>Ticker</div>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>
            Ex-Div Date
          </div>
          <div className={`${styles.cellKey} ${styles.cellNormal}`}>
            Payment Date
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
        </div>
        <div className={styles.tableContainer}>
          {/* array is sorted by divDate before mapping */}
          {sort(monthArray)
            .asc((div) => div.divDate)
            .map((div) => (
              <div className={styles.divFlexContainer} key={uuidv4()}>
                <h6 className={styles.ticker}>
                  <div>{div.ticker}</div>
                </h6>
                <div className={styles.cellNormal}>
                  {div.exDivDate ? monthToStringAbbv(div.exDivMonth) : ""}{" "}
                  {div.exDivDate ? div.exDivDay : " "}
                </div>
                <div className={styles.cellNormal}>
                  {monthToStringAbbv(div.month)} {div.day}
                </div>
                <div className={styles.cellNormal}>{div.shares}</div>
                <div className={styles.cellNormal}>{div.amount}</div>
                <div className={styles.cellGreen}>{div.total}</div>
                <div className={styles.cellRed}>{div.costBasis || ""}</div>
                <div className={styles.cellRed} title="shares * cost basis">
                  {div.netCostBasis || ""}
                </div>
                <div
                  className={styles.cellBlue}
                  title="amount * frequency(i.e. quarterly = 4) / cost basis"
                >
                  {div.yield ? `${div.yield}%` : ""}
                </div>
              </div>
            ))}
          <div className={styles.summaryContainer}>
            <div className={styles.cellSummaryBlue}>Monthly</div>
            <div className={styles.cellSummaryBlue}>Totals /</div>
            <div className={styles.cellSummaryBlue}>Averages</div>
            <div className={styles.cellSummaryBlue}></div>
            <div className={styles.cellSummaryBlue}></div>
            <div className={styles.cellGreen}>${monthlyTotalDividends}</div>
            <div className={styles.cellRed}></div>
            <div className={styles.cellRed} title="sum of net cost bases">
              ${netCostBasisTotal}
            </div>
            <div
              className={styles.cellBlue}
              title="sum of yields / # of yields"
            >
              {avgYield ? `${avgYield}%` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMonthRow;
