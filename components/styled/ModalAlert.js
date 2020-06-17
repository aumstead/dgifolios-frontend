import Backdrop from "../../components/styled/Backdrop";
import styles from "./ModalAlert.module.scss";
import LoadingSpinner from "../styled/LoadingSpinner";

function ModalAlert(props) {
  const { heading, text, children, backdropOnClick, loading } = props;
  return (
    <>
      <div className={styles.modal}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinnerContainer}>
              <LoadingSpinner size="small" />
            </div>
          </div>
        )}
        <div className={styles.sectionHeading}>
          <h3 className={styles.sectionHeading__heading}>{heading}</h3>
        </div>
        <div className={styles.sectionText}>
          <p className={styles.sectionText__text}>{text}</p>
        </div>
        <div className={styles.sectionButtons}>{children}</div>
      </div>
      <Backdrop onClick={backdropOnClick} loading={loading} />
    </>
  );
}

export default ModalAlert;
