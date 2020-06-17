import styles from './ModalPositionRow.module.scss'

function ModalPositionRow({ ticker, shares, costBasis, investedCapital, percent }) {
  return (
    <div className={styles.row}>
      {/* ticker */}
      <span>{ticker}</span>

      {/* shares */}
      <span className={styles.shares}>{shares}</span>

      <span>${costBasis}</span>

      <span>${investedCapital}</span>

      <span>{percent}%</span>
    </div>
  );
}

export default ModalPositionRow;
