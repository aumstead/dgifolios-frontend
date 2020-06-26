import styles from "./ModalPie.module.scss";
import Backdrop from "../../styled/Backdrop";
import PortfolioPie from "../../portfolio/index/PortfolioPie";
import CloseBtnSvg from "./CloseBtnSvg";
import { useEffect } from 'react'

function ModalPie({ backdropOnClick, portfolio, username }) {
  useEffect(() => {
    document.body.classList.add('disableBodyScroll');

    return () => {
      document.body.classList.remove('disableBodyScroll')
    }
  }, [])
  return (
    <>
      <div className={styles.modal}>
        <CloseBtnSvg handleClick={backdropOnClick} />
        <h3 className={styles.heading}>{`${username}'s portfolio`}</h3>
        <PortfolioPie portfolio={portfolio} />
      </div>
      <Backdrop onClick={backdropOnClick} />
    </>
  );
}

export default ModalPie;
