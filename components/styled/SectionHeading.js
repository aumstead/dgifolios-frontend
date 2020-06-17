import styles from "./SectionHeading.module.scss";
import Link from "next/link";

function SectionHeading({ text, explanation, stylesObj }) {
  return (
    <div>
      <h2 className={styles.sectionHeading} style={stylesObj}>{text}</h2>


      {explanation && <p className={styles.explanation}>{explanation}</p>}
    </div>
  );
}

export default SectionHeading;
