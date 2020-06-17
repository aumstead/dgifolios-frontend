import PortfolioRow from './PortfolioRow'
import styles from "./PortfolioTable.module.scss";
import sort from 'fast-sort'
import { useState, useEffect } from 'react'

function PortfolioTable({ portfolio }) {
  if (!portfolio) {
    return <div></div>;
  }

  if (portfolio.length === 0) {
    return <div>You have 0 positions. Add positions to your portfolio.</div>
  }

  const [portfolioState, setPortfolioState] = useState([])
  const [directionByPercentage, setDirectionByPercentage] = useState(true)
  const [directionByInvestedCapital, setDirectionByInvestedCapital] = useState(true)
  const [directionByCostBasis, setDirectionByCostBasis] = useState(true)
  const [directionByShares, setDirectionByShares] = useState(true)
  const [directionByTicker, setDirectionByTicker] = useState(false)

  useEffect(() => {
    setPortfolioState(portfolio)
  }, [])

  function sortByTicker() {
    setDirectionByTicker(!directionByTicker)
    if (directionByTicker) {
      sort(portfolio).desc(stock => stock.ticker)
    } else {
      sort(portfolio).asc(stock => stock.ticker)
    }
    setPortfolioState([...portfolio])
  }

  function sortByShares() {
    setDirectionByShares(!directionByShares)
    if (directionByShares) {
      sort(portfolio).desc(stock => stock.shares)
    } else {
      sort(portfolio).asc(stock => stock.shares)
    }
    setPortfolioState([...portfolio])
  }

  function sortByCostBasis() {
    setDirectionByCostBasis(!directionByCostBasis)
    if (directionByCostBasis) {
      sort(portfolio).desc(stock => stock.costBasis)
    } else {
      sort(portfolio).asc(stock => stock.costBasis)
    }
    setPortfolioState([...portfolio])
  }

  function sortByInvestedCapital() {
    setDirectionByInvestedCapital(!directionByInvestedCapital)
    if (directionByInvestedCapital) {
      sort(portfolio).desc(stock => stock.investedCapital)
    } else {
      sort(portfolio).asc(stock => stock.investedCapital)
    }
    setPortfolioState([...portfolio])
  }

  function sortByPercentage() {
    setDirectionByPercentage(!directionByPercentage)
    if (directionByPercentage) {
      sort(portfolio).desc(stock => stock.percentOfPortfolio)
    } else {
      sort(portfolio).asc(stock => stock.percentOfPortfolio)
    }
    setPortfolioState([...portfolio])
  }

  return (
    <div className={styles.portfolioTableContainer}>
      
        <div className={styles.tableHeadings}>
          <h6 onClick={sortByTicker} className={styles.tableHeading}>Ticker</h6>
          <h6 onClick={sortByShares} className={styles.tableHeading}>Shares</h6>
          <h6 onClick={sortByCostBasis} className={styles.tableHeading}>Avg Cost / Share</h6>
          <h6 onClick={sortByInvestedCapital} className={styles.tableHeading}>Total Invested Capital</h6>
          <h6 onClick={sortByPercentage} className={styles.tableHeading}>% of Portfolio</h6>
        </div>
        
        {portfolioState.map((stock) => {
          return (
            <PortfolioRow ticker={stock.ticker} shares={stock.shares} costBasis={stock.costBasis} investedCapital={stock.investedCapital} percentOfPortfolio={stock.percentOfPortfolio} key={stock._id} mongoId={stock._id} />
          );
        })}
    </div>
  );
}

export default PortfolioTable;
