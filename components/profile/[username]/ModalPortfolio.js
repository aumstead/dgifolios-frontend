import styles from "./ModalPortfolio.module.scss";
import Backdrop from "../../styled/Backdrop";
import ProfilePortfolioTable from "./ProfilePortfolioTable"
import CloseBtnSvg from "./CloseBtnSvg";
import { useEffect, useState } from 'react'
import sort from 'fast-sort'

function ModalPortfolio({ backdropOnClick, portfolio, username }) {
  // States
  const [portfolioState, setPortfolioState] = useState(portfolio)
  const [directionByPercentage, setDirectionByPercentage] = useState(true);
  const [directionByInvestedCapital, setDirectionByInvestedCapital] = useState(
    true
  );
  const [directionByCostBasis, setDirectionByCostBasis] = useState(true);
  const [directionByShares, setDirectionByShares] = useState(true);
  const [directionByTicker, setDirectionByTicker] = useState(false);

  useEffect(() => {
    document.body.classList.add('disableBodyScroll');

    return () => {
      document.body.classList.remove('disableBodyScroll')
    }
  }, [])

  function sortByTicker() {
    setDirectionByTicker(!directionByTicker);
    if (directionByTicker) {
      sort(portfolio).desc((stock) => stock.ticker);
    } else {
      sort(portfolio).asc((stock) => stock.ticker);
    }
    setPortfolioState([...portfolio]);
  }

  function sortByShares() {
    setDirectionByShares(!directionByShares);
    if (directionByShares) {
      sort(portfolio).desc((stock) => stock.shares);
    } else {
      sort(portfolio).asc((stock) => stock.shares);
    }
    setPortfolioState([...portfolio]);
  }

  function sortByCostBasis() {
    setDirectionByCostBasis(!directionByCostBasis);
    if (directionByCostBasis) {
      sort(portfolio).desc((stock) => stock.costBasis);
    } else {
      sort(portfolio).asc((stock) => stock.costBasis);
    }
    setPortfolioState([...portfolio]);
  }

  function sortByInvestedCapital() {
    setDirectionByInvestedCapital(!directionByInvestedCapital);
    if (directionByInvestedCapital) {
      sort(portfolio).desc((stock) => stock.investedCapital);
    } else {
      sort(portfolio).asc((stock) => stock.investedCapital);
    }
    setPortfolioState([...portfolio]);
  }

  function sortByPercentage() {
    setDirectionByPercentage(!directionByPercentage);
    if (directionByPercentage) {
      sort(portfolio).desc((stock) => stock.percentOfPortfolio);
    } else {
      sort(portfolio).asc((stock) => stock.percentOfPortfolio);
    }
    setPortfolioState([...portfolio]);
  }

  return (
    <>
      <div className={styles.modal}>
        <CloseBtnSvg handleClick={backdropOnClick} />
        <h3 className={styles.heading}>{`${username}'s portfolio`}</h3>
        <div className={styles.tableHeadings}>
          <span className={styles.tableHeadings__col} onClick={sortByTicker}>Ticker</span>
          <span className={styles.tableHeadings__col} onClick={sortByShares}>Shares</span>
          <span className={styles.tableHeadings__col} onClick={sortByCostBasis}>Cost basis</span>
          <span className={styles.tableHeadings__col} onClick={sortByInvestedCapital}>Invested capital</span>
          <span className={styles.tableHeadings__col} onClick={sortByPercentage}>% of portfolio</span>
        </div>
        <ProfilePortfolioTable portfolio={portfolioState} username={username} />
      </div>
      <Backdrop onClick={backdropOnClick} />
    </>
  );
}

export default ModalPortfolio;
