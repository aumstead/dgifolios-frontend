import Link from "next/link";
import styles from "./PortfolioRow.module.scss";

function PortfolioRow({
  ticker,
  shares,
  costBasis,
  investedCapital,
  percentOfPortfolio,
  mongoId,
}) {
  return (
    <div className={styles.row}>
      <Link
        href={`/portfolio/[ticker]?ticker=${ticker}`}
        as={`/portfolio/${ticker}`}
      >
        <span className={styles.ticker}>{ticker}</span>
      </Link>
      <span>{shares}</span>
      <span>{costBasis}</span>
      <span>${investedCapital}</span>
      <span>{percentOfPortfolio}%</span>
    </div>
  );
}

export default PortfolioRow;
