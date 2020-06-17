import styles from "./UpcomingExDivStock.module.scss";
import Link from "next/link";

function UpcomingExDivStock({ ticker, prevExDivDate, estimatedExDivDate }) {
  return (
    <div className={styles.stockContainer}>
      <div className={styles.ticker}>
        <Link
          href={`/portfolio/[ticker]?ticker=${ticker}`}
          as={`/portfolio/${ticker}`}
        >
          <a className={styles.tickerAnchor}>{ticker}</a>
        </Link>
      </div>
      <div className={`${styles.cellNormal} ${styles.cellPrevious}`}>{prevExDivDate}</div>
      <div className={`${styles.cellNormal} ${styles.cellEstimated}`}>~ {estimatedExDivDate}</div>
    </div>
  );
}

export default UpcomingExDivStock;
