import styles from "./ProfilePortfolioTable.module.scss";
import sort from "fast-sort";
import { useState } from "react";
import ModalPositionRow from './ModalPositionRow'

function ProfilePortfolioTable({ portfolio }) {
  if (portfolio.length === 0) {
    return <div>Zero positions.</div>;
  }

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
      <div className={styles.tableWhiteSpace}></div>
    </div>
  );
}

export default ProfilePortfolioTable;
