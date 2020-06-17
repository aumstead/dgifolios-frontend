import styles from "./PageHeading.module.scss";

function PageHeading({ text, styleObj }) {
  return (
    <>
      <h1 className={styles.pageHeading} style={styleObj}>{text}</h1>
      {/* <hr className={styles.hr} /> */}
    </>
  );
}

export default PageHeading;
