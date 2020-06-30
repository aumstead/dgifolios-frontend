import styles from "./monthly.module.scss";
import SidebarMenu from "../../components/styled/SidebarMenu";
import PageHeading from "../../components/styled/PageHeading";
import SectionHeading from "../../components/styled/SectionHeading";
import MonthlyBarChart from "../../components/dividends/MonthlyBarChart";
import { useState, useEffect, useContext } from "react";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import DateContext from "../../contexts/date/DateContext";
import DivsByMonth from "../../components/dividends/DivsByMonth";
import LoadingSpinner from "../../components/styled/LoadingSpinner";
import Link from "next/link";
import Footer from '../../components/styled/Footer'

function monthly({ ctx, user }) {
  // Contexts
  const dividendContext = useContext(DividendContext);
  const portfolioContext = useContext(PortfolioContext);
  const dateContext = useContext(DateContext);
  const {
    dividends,
    getDividends,
    years,
    showZeroDividends
  } = dividendContext;
  const { portfolio, getPortfolio } = portfolioContext;
  const { currentYear } = dateContext;

  // State
  const [showComponent, setShowComponent] = useState(false);
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [yearState, setYearState] = useState(currentYear);

  function handleClickBtn(e) {
    e.preventDefault();
    setShowYearMenu((prevState) => !prevState);
  }

  function handleClickYear(e) {
    setYearState(e.currentTarget.innerHTML);
    setShowYearMenu((prevState) => !prevState);
  }

  function handleClickOverlay() {
    setShowYearMenu(false);
  }

  if (showZeroDividends) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="Monthly View" />
        <div className={styles.contentContainerZero}>
          <div className={styles.messageContainer}>
            <h2>You have zero dividends recorded.</h2>
            <Link href="/edit/dividends">
              <a className={styles.btnZero}>&#43;&nbsp;Add dividends</a>
            </Link>
          </div>
          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu user={user}>
      {showYearMenu && (
        <div className={styles.overlay} onClick={handleClickOverlay} />
      )}
      <PageHeading text="Monthly View" />

      <div className={styles.contentContainer}>
        <SectionHeading text="Dividends by Month" />
        <menu className={styles.secondaryMenu}>
          <button className={styles.btnSecondaryMenu} onClick={handleClickBtn}>
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
        </menu>
        <DivsByMonth dividends={dividends} yearState={yearState} />
        <SectionHeading text="Monthly History Bar Chart" />
        <div className={styles.barChartContainer}>
          <MonthlyBarChart dividends={dividends} years={years} />
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default monthly;
