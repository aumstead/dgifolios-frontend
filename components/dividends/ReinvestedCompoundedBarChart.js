import styles from "./ReinvestedCompoundedBarChart.module.scss";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState, useContext, useRef } from "react";
import sort from "fast-sort";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";

function ReinvestedCompoundedBarChart({ setShowChart, setData, setXAxisObject, setYScaleObject }) {
  // Contexts
  const dividendContext = useContext(DividendContext);
  const { lastTwelveMonthYield } = dividendContext;
  const portfolioContext = useContext(PortfolioContext);
  const { totalInvestedCapital } = portfolioContext;

  // Ref
  const checkboxRef = useRef(null);

  // States
  const [values, setValues] = useState({
    years: "",
    divGrowthRate: "",
    annualYield: "",
    contribution: "",
  });
  const [useLastTwelveMonthYield, setUseLastTwelveMonthYield] = useState(false);
  const [addContribution, setAddContribution] = useState(false);

  const { years, divGrowthRate, annualYield, contribution } = values;

  function generateLineChart() {
    // make data array, get current date in order to get current year.
    const dataArray = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let startingYear = currentYear + 1;

    // create amount variable and set it to input. If checkbox is checked, change amount to lastTwelveMonthsDivs

    let portfolioTotal = totalInvestedCapital;
    let yearlyDivs = 0;

    // make the calculation based on variables
    for (let i = 0; i < years; i++) {
      yearlyDivs = portfolioTotal * (annualYield / 100);
      let yearlyDivsCagr = yearlyDivs * (divGrowthRate / 100 + 1);
      dataArray.push({
        year: startingYear,
        dividends: Number(yearlyDivsCagr.toFixed(2)),
      });
      startingYear++;
      portfolioTotal += yearlyDivsCagr;

      if (addContribution) {
        portfolioTotal += Number(contribution);
      }
    }

    const yScaleObj = getYScale(dataArray);

    if (years > 20) {
      setXAxisObject({ tickRotation: 45 });
    } else {
      setXAxisObject({ tickRotation: 0 });
    }

    setData(dataArray);
    setYScaleObject(yScaleObj);
    if (dataArray.length !== 0) {
      setShowChart(true);
    }
  }

  function getYScale(data) {
    if (data.length === 0) {
      return { yMax: 0 };
    }
    sort(data).asc((div) => div.dividends);
    const lastIndex = data.length - 1;
    const yScale = data[lastIndex].dividends / 5;
    const yMax = data[lastIndex].dividends + yScale;

    return { yMax };
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleGenerateClick(e) {
    e.preventDefault();
    generateLineChart();
  }

  function handleContributionClick(e) {
    e.preventDefault();
    setAddContribution(true);
  }

  function handleContributionCancel(e) {
    e.preventDefault();
    setAddContribution(false);
  }

  function handleCheckbox() {
    if (!checkboxRef.current.checked) {
      return setValues((prevState) => ({
        ...prevState,
        annualYield: "",
      }));
    }

    setUseLastTwelveMonthYield(!useLastTwelveMonthYield);

    return setValues((prevState) => ({
      ...prevState,
      annualYield: lastTwelveMonthYield,
    }));
  }

  return (
    <div className={styles.componentContainer}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="annualYield" className={styles.label}>
            Annual yield
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="annualYield"
            className={styles.input}
            value={annualYield}
          />
          <input
            ref={checkboxRef}
            onChange={handleCheckbox}
            className={styles.checkbox}
            type="checkbox"
            name="useLastTwelveMonthYield"
            value={useLastTwelveMonthYield}
          />
          <label className={styles.labelCheckbox} htmlFor="checkbox">
            Use my last 12 month yield.
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="years" className={styles.label}>
            # of years
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="years"
            className={styles.input}
            value={values.years}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="divGrowthRate" className={styles.label}>
            Annual dividend growth rate (percent)
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="divGrowthRate"
            className={styles.input}
            value={values.divGrowthRate}
          />
        </div>
        {addContribution && (
          <div className={styles.formGroup}>
            <label htmlFor="divGrowthRate" className={styles.label}>
              Annual portfolio contribution (cash amount)
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="contribution"
              className={styles.input}
              value={values.contribution}
            />
          </div>
        )}
        {!addContribution && (
          <button
            className={styles.contributionButton}
            onClick={handleContributionClick}
          >
            <span className={styles.iconPlus}>&#43;</span>
            <span>Add a yearly contribution to portfolio</span>
          </button>
        )}
        {addContribution && (
          <div className={styles.contributionFlexContainer}>
            <p className={styles.contributionText}>
              * Contribution is added to portfolio annually, thus compounding is annual (versus monthly, quarterly, etc.)
            </p>
            <button
              onClick={handleContributionCancel}
              className={styles.contributionCancel}
            >
              Cancel
            </button>
          </div>
        )}
        <button onClick={handleGenerateClick} className={styles.generateButton}>
          Generate Chart
        </button>
      </form>
      
    </div>
  );
}

export default ReinvestedCompoundedBarChart;
