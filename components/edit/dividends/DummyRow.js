import styles from "./DummyRow.module.scss";

function DummyRow({
  ticker,
  shares,
  costBasis,
  exDivDate,
  divDate,
  amount,
  frequency,
}) {
  return (
    <div className={styles.row}>
      {/* ticker */}
      <p className={styles.ticker}>{ticker}</p>

      {/* shares */}
      <p className={styles.shares}>{shares}</p>

      {/* cost basis */}
      <p className={styles.costBasis}>{costBasis}</p>

      <span>{exDivDate}</span>
      <span>{divDate}</span>
      <span>{amount}</span>
      <span>{frequency}</span>

      <button disabled className={`${styles.button} ${styles.buttonEdit}`}>
        Edit
      </button>

      <button disabled className={`${styles.button} ${styles.buttonDelete}`}>
        Delete
      </button>
    </div>
  );
}

export default DummyRow;
