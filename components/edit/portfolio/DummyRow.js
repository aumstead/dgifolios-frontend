import styles from "./DummyRow.module.scss";

function DummyRow({ ticker, shares, costBasis }) {
  return (
    <div className={styles.row}>
      {/* ticker */}
      <p className={styles.ticker}>{ticker}</p>

      {/* shares */}
      <p className={styles.shares}>{shares}</p>

      {/* cost basis */}
      <p className={styles.costBasis}>{costBasis}</p>

      <button disabled className={`${styles.button} ${styles.buttonEdit}`}>Edit</button>

      <button disabled className={`${styles.button} ${styles.buttonDelete}`}>
        Delete
      </button>
    </div>
  );
}

export default DummyRow;
