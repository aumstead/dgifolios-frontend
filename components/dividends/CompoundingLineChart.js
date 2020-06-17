import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import sort from "fast-sort";
import styles from "./CompoundingLineChart.module.scss";

function MonthlyLineChart({ dividends }) {
  // States
  const [values, setValues] = useState({
    years: "",
    cagr: "",
    startingAmount: "",
  });
  const [useLastTwelveMonthsDivs, setUseLastTwelveMonthsDivs] = useState(false);
  const [data, setData] = useState([]);
  const [yScaleObject, setYScaleObject] = useState({ yMin: 0, yMax: 0 });
  const [xAxisObject, setXAxisObject] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [addDrip, setAddDrip] = useState(false);

  const { years, cagr, startingAmount } = values;

  useEffect(() => {
    generateLineChart();
  }, []);

  const lastTwelveMonthsDivsArray = getLastTwelveMonthsDividends();

  let lastTwelveMonthsDivsTotal = 0;
  lastTwelveMonthsDivsArray.forEach((div) => {
    lastTwelveMonthsDivsTotal += div.total;
  });
  lastTwelveMonthsDivsTotal = Number(lastTwelveMonthsDivsTotal.toFixed(2));

  function generateLineChart() {
    // make data array, get current date in order to get current year.
    const dataArray = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let startingYear = currentYear + 1;

    // create amount variable and set it to input. If checkbox is checked, change amount to lastTwelveMonthsDivs
    let amount = startingAmount;
    if (useLastTwelveMonthsDivs) {
      lastTwelveMonthsDivsTotal = Number(lastTwelveMonthsDivsTotal.toFixed(2));
      dataArray.push({ x: currentYear, y: lastTwelveMonthsDivsTotal });
      amount = lastTwelveMonthsDivsTotal;
    }

    // make the calculation based on variables
    for (let i = 0; i < years; i++) {
      let finalAmount = amount * Math.pow(cagr / 100 + 1, 1);
      dataArray.push({ x: startingYear++, y: Number(finalAmount.toFixed(2)) });
      amount = finalAmount;
    }

    // set dataArray as data
    const data = [
      {
        id: "Yearly Dividends",
        data: dataArray,
      },
    ];

    const yScaleObj = getYScale(dataArray);

    if (years > 20) {
      setXAxisObject({ tickRotation: 45 });
    } else {
      setXAxisObject({ tickRotation: 0 });
    }
    setData(data);
    setYScaleObject(yScaleObj);
    console.log(dataArray);
    if (dataArray.length !== 0) {
      setShowChart(true);
    }
  }

  function getYScale(data) {
    if (data.length === 0) {
      return { yMax: 0, yMin: 0 };
    }
    sort(data).asc((div) => div.y);
    const lastIndex = data.length - 1;
    const difference = data[lastIndex].y - data[0].y;
    const yScale = difference / 3;
    const yMax = data[lastIndex].y + yScale;
    let yMin = data[0].y - yScale;

    if (yMin <= 0) {
      yMin = 0;
    }

    return { yMax, yMin };
  }

  function getLastTwelveMonthsDividends() {
    const currentDate = new Date();
    const oneYearAgoDateObj = new Date();
    oneYearAgoDateObj.setMonth(currentDate.getMonth() - 12);

    // calculate beginning of 12 months ago date object
    const lastYearMonth = oneYearAgoDateObj.getMonth();
    const lastYearYear = oneYearAgoDateObj.getFullYear();
    const lastYearFinalObj = new Date();
    lastYearFinalObj.setFullYear(lastYearYear, lastYearMonth, 1);

    // calculate last day of previous month from currentDate
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const mostRecentMonthFinalObj = new Date();
    mostRecentMonthFinalObj.setFullYear(currentYear, currentMonth, 0);

    // filter last 12 months' dividends into array
    const lastTwelveMonthsDivsArray = dividends.filter(
      (div) =>
        new Date(div.divDate) < mostRecentMonthFinalObj &&
        new Date(div.divDate) > lastYearFinalObj
    );

    return lastTwelveMonthsDivsArray;
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

  function handleDripClick(e) {
    e.preventDefault();
    setAddDrip(true);
  }

  function handleDripCancel(e) {
    e.preventDefault();
    setAddDrip(false);
  }

  return (
    <div
      style={{
        height: "45rem",
        width: "80rem",
        marginLeft: "6rem",
        display: "block",
      }}
    >
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="startingAmount" className={styles.label}>
            Starting Amount
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="startingAmount"
            className={styles.input}
            value={
              useLastTwelveMonthsDivs
                ? lastTwelveMonthsDivsTotal
                : values.startingAmount
            }
          />
          <input
            onChange={() =>
              setUseLastTwelveMonthsDivs(!useLastTwelveMonthsDivs)
            }
            className={styles.checkbox}
            type="checkbox"
            name="useLastTwelveMonthsDivs"
            value={useLastTwelveMonthsDivs}
          />
          <label className={styles.labelCheckbox} htmlFor="checkbox">
            Use my last 12 months of accumulated dividends as starting amount.
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="years" className={styles.label}>
            # of Years
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
          <label htmlFor="cagr" className={styles.label}>
            Annual Growth Rate Percentage
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="cagr"
            className={styles.input}
            value={values.cagr}
          />
        </div>
        {!addDrip && (
          <button className={styles.dripButton} onClick={handleDripClick}>
            <span className={styles.iconPlus}>&#43;</span>
            <span>Add dividend reinvestment (DRIP) to calculation</span>
          </button>
        )}
        {addDrip && (
          <div className={styles.dripFlexContainer}>
            <p className={styles.dripText}>
              * Dividends are reinvested and compounded annually
            </p>
            <button onClick={handleDripCancel} className={styles.dripCancel}>
              Cancel
            </button>
          </div>
        )}
        <button onClick={handleGenerateClick} className={styles.generateButton}>
          Generate Chart
        </button>
      </form>
      {showChart && (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 130, bottom: 180, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: yScaleObject.yMin,
            max: yScaleObject.yMax,
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: xAxisObject.tickRotation,
            legend: "Year",
            legendOffset: 40,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Dividends per year",
            legendOffset: -60,
            legendPosition: "middle",
          }}
          colors={{ scheme: "paired" }}
          pointSize={7}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}

export default MonthlyLineChart;
