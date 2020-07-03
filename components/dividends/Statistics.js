import styles from "./Statistics.module.scss";
import { useEffect, useState, useContext } from "react";
import { monthToString } from "../../utils/conversions";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import Link from "next/link";
import sort from "fast-sort";
import { v4 as uuidv4 } from "uuid";

function Statistics({ daysWithDividend }) {
  // Contexts
  const dividendContext = useContext(DividendContext);
  const {
    dividends,
    lastTwelveMonthYield,
    setLastTwelveMonthYield,
    allTimeRankings,
  } = dividendContext;
  const portfolioContext = useContext(PortfolioContext);
  const { portfolio } = portfolioContext;

  // States
  const [allTimeTotal, setAllTimeTotal] = useState("");
  const [lastMonthObject, setLastMonthObject] = useState({});
  // const [lastTwelveMonthYield, setLastTwelveMonthYield] = useState("");
  const [monthlyPaymentAverage, setMonthlyPaymentAverage] = useState("");
  const [topThreePayers, setTopThreePayers] = useState([]);
  const [topThreeYielders, setTopThreeYielders] = useState([]);
  const [hideTopThreeYieldOnCost, setHideTopThreeYieldOnCost] = useState(false)

  useEffect(() => {
    calculateAllTimeTotal();
    calculateLastMonthYield();
    calculateLastTwelveMonthYield();
    calculateLastTwelveMonthPaymentAverage();
    createTopThreePayers();
    createTopThreeYielders();
  }, []);

  function createTopThreePayers() {
    const topThreeArray = [];
    
    if(allTimeRankings[0]) topThreeArray.push(allTimeRankings[0]);
    if(allTimeRankings[1]) topThreeArray.push(allTimeRankings[1]);
    if(allTimeRankings[2]) topThreeArray.push(allTimeRankings[2]);
    setTopThreePayers(topThreeArray);
  }

  function calculateAllTimeTotal() {
    let allTimeTotalCount = 0;
    dividends.forEach((div) => {
      allTimeTotalCount += div.total;
    });
    setAllTimeTotal(allTimeTotalCount.toFixed(2));
  }

  function calculateLastMonthYield() {
    const currentDate = new Date();
    const lastMonthDateObj = new Date();
    lastMonthDateObj.setMonth(currentDate.getMonth() - 1);
    const lastMonthMonth = lastMonthDateObj.getMonth();
    const lastMonthYear = lastMonthDateObj.getFullYear();

    const prevMonthDividendsArray = dividends.filter(
      (div) => div.month === lastMonthMonth && div.year === lastMonthYear
    );

    let prevMonthTotal = 0;
    prevMonthDividendsArray.forEach((div) => {
      prevMonthTotal += div.total;
    });

    let totalInvestedCapital = 0;
    portfolio.forEach((position) => {
      totalInvestedCapital += position.investedCapital;
    });
    const lastMonthsYield = (
      (prevMonthTotal / (totalInvestedCapital / 12)) *
      100
    ).toFixed(2);
    const lastMonth = monthToString(lastMonthMonth);

    return setLastMonthObject({ yield: lastMonthsYield, month: lastMonth });
  }

  function getLastTwelveMonthsDividends() {
    const currentDate = new Date();
    const oneYearAgoDateObj = new Date();
    oneYearAgoDateObj.setMonth(currentDate.getMonth() - 12);

    // calculate beginning of 12 months ago date object
    const lastYearMonth = oneYearAgoDateObj.getMonth();
    const lastYearYear = oneYearAgoDateObj.getFullYear();
    const lastYearFinalObj = new Date();
    lastYearFinalObj.setFullYear(lastYearYear, lastYearMonth, 1);

    // calculate last day of previous month from currentDate
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const mostRecentMonthFinalObj = new Date();
    mostRecentMonthFinalObj.setFullYear(currentYear, currentMonth, 0);

    // filter last 12 months' dividends into array
    const lastTwelveMonthsDivsArray = dividends.filter(
      (div) =>
        new Date(div.divDate) < mostRecentMonthFinalObj &&
        new Date(div.divDate) > lastYearFinalObj
    );

    return lastTwelveMonthsDivsArray;
  }

  function calculateLastTwelveMonthYield() {
    const lastTwelveMonthsDivsArray = getLastTwelveMonthsDividends();

    // filter stocks with netCostBasis
    const divsWithNetCostBasis = lastTwelveMonthsDivsArray.filter(
      (div) => div.netCostBasis
    );

    // filter by frequency and dump into array buckets
    const quarterly = divsWithNetCostBasis.filter(
      (div) => div.frequency === "quarterly"
    );
    const monthly = divsWithNetCostBasis.filter(
      (div) => div.frequency === "monthly"
    );
    const biannually = divsWithNetCostBasis.filter(
      (div) => div.frequency === "biannually"
    );
    const annually = divsWithNetCostBasis.filter(
      (div) => div.frequency === "annually"
    );

    // formula is divide each frequency totatCostBasis by their frequency. Add up those 4 quotients. Add up all the dividends. Divide dividends by the sum of the 4 quotients = weightedYield
    let quarterlyTotalCostBasis = 0;
    let quarterlyTotalDivAmount = 0;
    quarterly.forEach((div) => {
      quarterlyTotalCostBasis += div.netCostBasis;
      quarterlyTotalDivAmount += div.total;
    });
    let quarterlyNumber = quarterlyTotalCostBasis / 4;

    let monthlyTotalCostBasis = 0;
    let monthlyTotalDivAmount = 0;
    monthly.forEach((div) => {
      monthlyTotalCostBasis += div.netCostBasis;
      monthlyTotalDivAmount += div.total;
    });
    let monthlyNumber = monthlyTotalCostBasis / 12;

    let biannuallyTotalCostBasis = 0;
    let biannuallyTotalDivAmount = 0;
    biannually.forEach((div) => {
      biannuallyTotalCostBasis += div.netCostBasis;
      biannuallyTotalDivAmount += div.total;
    });
    let biannuallyNumber = biannuallyTotalCostBasis / 2;

    let annuallyTotalCostBasis = 0;
    let annuallyTotalDivAmount = 0;
    annually.forEach((div) => {
      annuallyTotalCostBasis += div.netCostBasis;
      annuallyTotalDivAmount += div.total;
    });
    let annuallyNumber = annuallyTotalCostBasis / 1;

    let denominator =
      annuallyNumber + biannuallyNumber + monthlyNumber + quarterlyNumber;
    let numerator =
      annuallyTotalDivAmount +
      biannuallyTotalDivAmount +
      monthlyTotalDivAmount +
      quarterlyTotalDivAmount;

    const weightedYield = numerator / denominator;

    return setLastTwelveMonthYield((weightedYield * 100).toFixed(2));
  }

  function calculateLastTwelveMonthPaymentAverage() {
    const lastTwelveMonthsDivsArray = getLastTwelveMonthsDividends();

    let totalDivs = 0;
    lastTwelveMonthsDivsArray.forEach((div) => {
      totalDivs += div.total;
    });
    setMonthlyPaymentAverage((totalDivs / 12).toFixed(2));
  }

  function createTopThreeYielders() {
    // filter dividends currently in portfolio
    const divsInPortfolio = [];
    dividends.forEach((div) => {
      portfolio.forEach((position) => {
        if (position.ticker === div.ticker) {
          divsInPortfolio.push(div);
        }
      });
    });
    // there are less than 3 portfolio positions yielding dividends
    if (divsInPortfolio[2] === undefined) {
      setHideTopThreeYieldOnCost(true)
      return;
    }
    // sort by yield
    const sortedDivs = sort(divsInPortfolio).desc(div => div.yield);
    // take top three
    // check to see if they are that stock's most recent payment.
    const topThreeArray = [];
    topThreeArray.push(sortedDivs[0])
    let count = 0
    let i = 0
    while (count < 2) {
      const someResult = topThreeArray.some(div => div.ticker === sortedDivs[i].ticker)
      if (!someResult) {
        topThreeArray.push(sortedDivs[i])
        i++
        count++
      } else {
        i++
      }
    }
    setTopThreeYielders(topThreeArray)
  }

  return (
    <div className={styles.componentContainer}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td
              className={styles.td}
              title="Sum of all dividends ever received"
            >
              <span>All-time dividends received</span>
            </td>
            <td className={styles.value}>
              <span title="Sum of all dividends ever received">
                ${allTimeTotal}
              </span>
            </td>
          </tr>
          <tr>
            <td
              className={styles.td}
              title="Last month's dividends / (total invested capital / 12)"
            >
              <span>{`${lastMonthObject.month}'s yield`}</span>
            </td>
            <td
              className={styles.value}
              title="Last month's dividends / (total invested capital / 12)"
            >
              {isNaN(lastMonthObject.yield) ? '0.00' : lastMonthObject.yield}%
            </td>
          </tr>

          <tr>
            <td className={styles.td}>
              <span title="A true yield of the previous 12 months that accounts for amount invested in each stock and dividend payment frequency. Dividends without cost basis data are omitted from the calculation.">
                12 month yield
              </span>
            </td>
            <td
              className={styles.value}
              title="A true yield of the previous 12 months that accounts for amount invested in each stock and dividend payment frequency. Dividends without cost basis data are omitted from the calculation."
            >
              {isNaN(lastTwelveMonthYield) ? 'n/a' : `${lastTwelveMonthYield}%`}
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <span>Last 12 months average monthly payment</span>
            </td>
            <td className={styles.value}>${monthlyPaymentAverage}</td>
          </tr>

          <tr>
            <td className={styles.td}>
              <span># of days with a dividend payment from last 12 months</span>
            </td>
            <td className={styles.value}>
              {daysWithDividend === 1
                ? `${daysWithDividend} day`
                : `${daysWithDividend} days`}
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.topThreeTd}>
              <span>Top 3 all-time payers</span>
            </td>
            <td className={styles.value}>
              
              {topThreePayers.map((position) => (
                <div className={styles.tickerDiv} key={uuidv4()}>
                  <span>
                    <Link
                      href={`/portfolio/[ticker]?ticker=${position.ticker}`}
                      as={`/portfolio/${position.ticker}`}
                    >
                      <a className={styles.tickerAnchor}>{position.ticker}</a>
                    </Link>
                    <span className={styles.topThreeAmount}>
                      {`($`}
                      {position.allTimeDividends.toFixed(2)}
                      {`)`}
                    </span>
                  </span>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td className={styles.topThreeTd}>
              <span>Top 3 yield on cost in portfolio</span>
            </td>
            <td className={styles.value}>

              {hideTopThreeYieldOnCost ? <span>n/a</span> : topThreeYielders.map((position) => (
                <div className={styles.tickerDiv} key={uuidv4}>
                  <span>
                    <Link
                      href={`/portfolio/[ticker]?ticker=${position.ticker}`}
                      as={`/portfolio/${position.ticker}`}
                    >
                      <a className={styles.tickerAnchor}>{position.ticker}</a>
                    </Link>
                    <span className={styles.topThreeAmount}>
                      {`(`}
                      {position.yield}
                      {`%)`}
                    </span>
                  </span>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
