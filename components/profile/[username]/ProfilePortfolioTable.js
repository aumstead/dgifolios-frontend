import PortfolioRow from "../../portfolio/index/PortfolioRow";
import styles from "./ProfilePortfolioTable.module.scss";
import sort from "fast-sort";
import { useState, useEffect } from "react";
import ModalPositionRow from './ModalPositionRow'

function ProfilePortfolioTable({ portfolio }) {
  if (portfolio.length === 0) {
    return <div>Zero positions.</div>;
  }

  const [directionByPercentage, setDirectionByPercentage] = useState(true);
  const [directionByInvestedCapital, setDirectionByInvestedCapital] = useState(
    true
  );
  const [directionByCostBasis, setDirectionByCostBasis] = useState(true);
  const [directionByShares, setDirectionByShares] = useState(true);
  const [directionByTicker, setDirectionByTicker] = useState(false);

  // function sortByTicker() {
  //   setDirectionByTicker(!directionByTicker);
  //   if (directionByTicker) {
  //     sort(portfolio).desc((stock) => stock.ticker);
  //   } else {
  //     sort(portfolio).asc((stock) => stock.ticker);
  //   }
  //   setPortfolioState([...portfolio]);
  // }

  // function sortByShares() {
  //   setDirectionByShares(!directionByShares);
  //   if (directionByShares) {
  //     sort(portfolio).desc((stock) => stock.shares);
  //   } else {
  //     sort(portfolio).asc((stock) => stock.shares);
  //   }
  //   setPortfolioState([...portfolio]);
  // }

  // function sortByCostBasis() {
  //   setDirectionByCostBasis(!directionByCostBasis);
  //   if (directionByCostBasis) {
  //     sort(portfolio).desc((stock) => stock.costBasis);
  //   } else {
  //     sort(portfolio).asc((stock) => stock.costBasis);
  //   }
  //   setPortfolioState([...portfolio]);
  // }

  // function sortByInvestedCapital() {
  //   setDirectionByInvestedCapital(!directionByInvestedCapital);
  //   if (directionByInvestedCapital) {
  //     sort(portfolio).desc((stock) => stock.investedCapital);
  //   } else {
  //     sort(portfolio).asc((stock) => stock.investedCapital);
  //   }
  //   setPortfolioState([...portfolio]);
  // }

  // function sortByPercentage() {
  //   setDirectionByPercentage(!directionByPercentage);
  //   if (directionByPercentage) {
  //     sort(portfolio).desc((stock) => stock.percentOfPortfolio);
  //   } else {
  //     sort(portfolio).asc((stock) => stock.percentOfPortfolio);
  //   }
  //   setPortfolioState([...portfolio]);
  // }

  return (
    <div className={styles.tableContainer}>
      {portfolio.map((position) => (
        <ModalPositionRow
        ticker={position.ticker}
        shares={position.shares}
        costBasis={position.costBasis}
        investedCapital={position.investedCapital}
        percent={position.percentOfPortfolio}
      />
      ))}
    </div>
  );
}

export default ProfilePortfolioTable;
