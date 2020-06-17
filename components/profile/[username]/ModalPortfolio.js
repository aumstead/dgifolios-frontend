import styles from "./ModalPortfolio.module.scss";
import Backdrop from "../../styled/Backdrop";
import ProfilePortfolioTable from "./ProfilePortfolioTable"
import CloseBtnSvg from "./CloseBtnSvg";

function ModalPortfolio({ backdropOnClick, portfolio, username }) {
  return (
    <>
      <div className={styles.modal}>
        <CloseBtnSvg handleClick={backdropOnClick} />
        <h3 className={styles.heading}>{`${username}'s portfolio`}</h3>
        <div className={styles.tableHeadings}>
          <span>Ticker</span>
          <span>Shares</span>
          <span>Cost basis</span>
          <span>Invested capital</span>
          <span>% of portfolio</span>
        </div>
        <ProfilePortfolioTable portfolio={portfolio} username={username} />
      </div>
      <Backdrop onClick={backdropOnClick} />
    </>
  );
}

export default ModalPortfolio;
