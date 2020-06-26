import styles from "./ModalDividends.module.scss";
import Backdrop from "../../styled/Backdrop";
import CloseBtnSvg from "./CloseBtnSvg";
import { useState, useContext } from "react";
import DateContext from "../../../contexts/date/DateContext";
import ProfileDivsByMonth from "./ProfileDivsByMonth";
import { useEffect } from 'react'

function ModalDividends({ backdropOnClick, dividends, years }) {
  // Contexts
  const dateContext = useContext(DateContext);
  const { currentYear } = dateContext;

  // States
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [yearState, setYearState] = useState(currentYear);

  useEffect(() => {
    document.body.classList.add('disableBodyScroll');

    return () => {
      document.body.classList.remove('disableBodyScroll')
    }
  }, [])

  function handleClickYear(e) {
    setYearState(e.currentTarget.innerHTML);
    setShowYearMenu((prevState) => !prevState);
  }

  return (
    <>
      <div className={styles.modal}>
        {showYearMenu && (
          <div
            className={styles.overlay}
            onClick={() => setShowYearMenu(false)}
          />
        )}

        <CloseBtnSvg handleClick={backdropOnClick} />
        <h3 className={styles.heading}>{`Dividends by month`}</h3>
        <div className={styles.btnAndMenu}>
          <button
            className={styles.btnSecondaryMenu}
            onClick={() => setShowYearMenu(true)}
          >
            Choose Year&nbsp;&nbsp;
            <span className={styles.iconTriangle}>&#9658;</span>
          </button>
          {showYearMenu && (
            <ul className={styles.ul}>
              {years.map((year) => (
                <li className={styles.li} onClick={handleClickYear}>
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ProfileDivsByMonth dividends={dividends} yearState={yearState} />
      </div>
      <Backdrop onClick={backdropOnClick} />
    </>
  );
}

export default ModalDividends;
