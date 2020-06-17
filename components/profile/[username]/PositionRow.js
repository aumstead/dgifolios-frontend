import styles from "./PositionRow.module.scss";
import Link from "next/link";

function PositionRow({ ticker, shares, percent }) {
  return (
    <div className={styles.row}>
      {/* ticker */}
      <span>{ticker}</span>

      {/* shares */}
      <span className={styles.shares}>{shares}</span>

      <span>{percent}%</span>
    </div>
  );
}

export default PositionRow;
