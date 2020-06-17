import styles from "./LoadingSpinner.module.scss";

function loadingSpinner({ size }) {
  return (
    <div
      className={
        size === "big"
          ? `${styles.ldsRing} ${styles.big}`
          : undefined || size === "small"
          ? `${styles.ldsRing} ${styles.small}`
          : undefined || size === "mini"
          ? `${styles.ldsRing} ${styles.mini}`
          : undefined
      }
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default loadingSpinner;
