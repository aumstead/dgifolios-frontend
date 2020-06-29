import styles from "./TickerInfo.module.scss";
import { useState, useEffect } from "react";
import sort from "fast-sort";

function TickerInfo({ portfolio, dividends, ticker, allTimeRankings }) {
  // States
  const [portfolioData, setPortfolioData] = useState({
    costBasis: "",
    investedCapital: "",
    percentOfPortfolio: "",
    shares: "",
    portfolioStatus: false,
  });
  const [dividendData, setDividendData] = useState({
    dividendStatus: false,
    allTimeDividends: "",
    allTimeRank: "",
    yieldOnCost: "",
  });
  const [showComponent, setShowComponent] = useState(false);

  // Destructure values from states
  const {
    costBasis,
    investedCapital,
    percentOfPortfolio,
    shares,
    portfolioStatus,
  } = portfolioData;

  const {
    dividendStatus,
    allTimeDividends,
    allTimeRank,
    yieldOnCost,
  } = dividendData;

  useEffect(() => {
    manipulatePortfolioData();
    manipulateDividendData();
    manipulateAllTimeRankingsData();
    setShowComponent(true);

    return () => {
      setDividendData({
        dividendStatus: false,
        allTimeDividends: "",
        allTimeRank: "",
        yieldOnCost: "",
      });

      setPortfolioData({
        costBasis: "",
        investedCapital: "",
        percentOfPortfolio: "",
        shares: "",
        portfolioStatus: false,
      });
    };
  }, [ticker]);

  function manipulatePortfolioData() {
    const tickerFromPortfolio = portfolio.find(
      (stock) => stock.ticker === ticker
    );

    if (tickerFromPortfolio) {
      const {
        costBasis,
        investedCapital,
        percentOfPortfolio,
        shares,
      } = tickerFromPortfolio;
      setPortfolioData((prevState) => ({
        ...prevState,
        costBasis,
        investedCapital,
        percentOfPortfolio,
        shares,
        portfolioStatus: true,
      }));
    }
  }

  function manipulateDividendData() {
    // Does this ticker actually have any dividends? Some in portfolio may not yet.
    const dividendsArray = dividends.filter((div) => div.ticker === ticker);

    // Is this ticker in the portfolio?
    const tickerFromPortfolio = portfolio.find(
      (stock) => stock.ticker === ticker
    );

    // Get yieldOnCost
    let yieldOnCost = false;
    // If there are dividends and ticker is in the portfolio
    if (dividendsArray.length !== 0 && tickerFromPortfolio) {
      // sort array so most recent is at start
      sort(dividendsArray).desc((div) => div.divDate);
      // if the most recent dividend is quarterly and costBasis property is truthy
      if (
        dividendsArray[0].frequency === "quarterly" &&
        tickerFromPortfolio.costBasis
      ) {
        yieldOnCost = Number(
          (
            ((dividendsArray[0].amount * 4) / tickerFromPortfolio.costBasis) *
            100
          ).toFixed(2)
        );
      }
    }

    // If there are some dividends create statistics
    if (dividendsArray.length !== 0) {
      // create some statistics

      setDividendData((prevState) => ({
        ...prevState,
        dividendStatus: true,
        yieldOnCost: yieldOnCost,
      }));
    }
  }

  function manipulateAllTimeRankingsData() {
    const obj = allTimeRankings.find((obj) => obj.ticker === ticker);
    if (!obj) {
      return;
    }
    let rank = allTimeRankings.indexOf(obj) + 1;
    setDividendData((prevState) => ({
      ...prevState,
      allTimeDividends: obj.allTimeDividends.toFixed(2),
      allTimeRank: rank,
    }));
  }

  if (!showComponent) {
    return <p>loading</p>;
  }

  return (
    <div className={styles.infoFlexContainer}>
      <div className={styles.infoSectionContainer}>
        <h2 className={styles.tableTitle}>Portfolio Info</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.td}>
                <span>Status</span>
              </td>
              <td>
                <span
                  className={
                    portfolioStatus
                      ? `${styles.value} ${styles.present}`
                      : `${styles.value} ${styles.absent}`
                  }
                >
                  {portfolioData.portfolioStatus ? "In portfolio" : "No current position"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>Shares</span>
              </td>
              <td>
                <span className={styles.value}>
                  {shares ? `${shares}` : "n/a"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>% of portfolio</span>
              </td>
              <td>
                <span className={styles.value}>
                  {percentOfPortfolio ? `${percentOfPortfolio}%` : "n/a"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>Avg price paid per share</span>
              </td>
              <td>
                <span className={styles.value}>
                  {costBasis ? `$${costBasis}` : "n/a"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>Invested capital</span>
              </td>
              <td>
                <span className={styles.value}>
                  {investedCapital ? `$${investedCapital}` : "n/a"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.infoSectionContainer}>
        <h2 className={styles.tableTitle}>Dividend Stats</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.td}>
                <span>Total cash received</span>
              </td>
              <td>
                <span className={styles.value}>
                  {dividendStatus ? `$${allTimeDividends}` : "n/a"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>All-time ranking</span>
              </td>
              <td>
                <span className={styles.value}>
                  {dividendStatus ? `${allTimeRank}` : "n/a"}
                </span>
              </td>
            </tr>
            <tr>
              <td className={styles.td}>
                <span>Yield on cost</span>
              </td>
              <td>
                <span className={styles.value}>
                  {yieldOnCost ? `${yieldOnCost}%` : "n/a"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TickerInfo;
