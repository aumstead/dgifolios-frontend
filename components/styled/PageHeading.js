import styles from "./PageHeading.module.scss";

function PageHeading({ text, styleObj, hidden }) {
  return (
    <>
      <h1 className={hidden ? styles.hiddenMobilePageHeading : styles.pageHeading} style={styleObj}>{text}</h1>
      {/* <hr className={styles.hr} /> */}
    </>
  );
}

export default PageHeading;
