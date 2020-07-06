import styles from "./SmallMonthlyBarChart.module.scss";
import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";

function SmallMonthlyBarChart({ dividends, years }) {
  // States
  const [barChartData, setBarChartData] = useState([]);

  const data = [
    { month: "Jan" },
    { month: "Feb" },
    { month: "March" },
    { month: "April" },
    { month: "May" },
    { month: "June" },
    { month: "July" },
    { month: "Aug" },
    { month: "Sep" },
    { month: "Oct" },
    { month: "Nov" },
    { month: "Dec" },
  ];

  useEffect(() => {
    createBarChartData();
  }, []);

  function createBarChartData() {
    dividends.forEach((div) => {
      // Look at month and add to corresponding 'month object' and 'year property' in data array. Create year property with total amount if it is yet to exist.
      switch (div.month) {
        case 0:
          data[0][div.year] = data[0][div.year] + div.total || div.total;
          // handle floating decimal issue
          data[0][div.year] = parseFloat(data[0][div.year].toFixed(2));
          break;
        case 1:
          data[1][div.year] = data[1][div.year] + div.total || div.total;
          data[1][div.year] = parseFloat(data[1][div.year].toFixed(2));
          break;
        case 2:
          data[2][div.year] = data[2][div.year] + div.total || div.total;
          data[2][div.year] = parseFloat(data[2][div.year].toFixed(2));
          break;
        case 3:
          data[3][div.year] = data[3][div.year] + div.total || div.total;
          data[3][div.year] = parseFloat(data[3][div.year].toFixed(2));
          break;
        case 4:
          data[4][div.year] = data[4][div.year] + div.total || div.total;
          data[4][div.year] = parseFloat(data[4][div.year].toFixed(2));
          break;
        case 5:
          data[5][div.year] = data[5][div.year] + div.total || div.total;
          data[5][div.year] = parseFloat(data[5][div.year].toFixed(2));
          break;
        case 6:
          data[6][div.year] = data[6][div.year] + div.total || div.total;
          data[6][div.year] = parseFloat(data[6][div.year].toFixed(2));
          break;
        case 7:
          data[7][div.year] = data[7][div.year] + div.total || div.total;
          data[7][div.year] = parseFloat(data[7][div.year].toFixed(2));
          break;
        case 8:
          data[8][div.year] = data[8][div.year] + div.total || div.total;
          data[8][div.year] = parseFloat(data[8][div.year].toFixed(2));
          break;
        case 9:
          data[9][div.year] = data[9][div.year] + div.total || div.total;
          data[9][div.year] = parseFloat(data[9][div.year].toFixed(2));
          break;
        case 10:
          data[10][div.year] = data[10][div.year] + div.total || div.total;
          data[10][div.year] = parseFloat(data[10][div.year].toFixed(2));
          break;
        case 11:
          data[11][div.year] = data[11][div.year] + div.total || div.total;
          data[11][div.year] = parseFloat(data[11][div.year].toFixed(2));
          break;
        default:
          console.error("End of switch. Maybe no divDate data.");
          break;
      }
    });
    setBarChartData(data);
  }

  return (
    <React.Fragment>
      <div className={styles.componentContainer}>
        {/* <div className={styles.dropdownContainer}>
        <button className={styles.dropdownBtn}>Color Scheme <span className={styles.arrow}>&#9662;</span></button>
      </div> */}
        <ResponsiveBar
          data={barChartData}
          keys={years}
          indexBy="month"
          margin={{ top: 25, right: 100, bottom: 50, left: 80 }}
          padding={0.3}
          groupMode="grouped"
          colors={[
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#b15928",
          ]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Monthly Total",
            legendPosition: "middle",
            legendOffset: -55,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableLabel={false}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 10,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={false}
        />
      </div>

      <div className={styles.mobileContainer}>
        <ResponsiveBar
          data={barChartData}
          keys={years}
          indexBy="month"
          margin={{ top: 25, right: 40, bottom: 90, left: 50 }}
          padding={0.3}
          groupMode="grouped"
          colors={[
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#b15928",
          ]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 37,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Monthly Total",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableLabel={false}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 70,
              itemsSpacing: 0,
              itemWidth: 50,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 8,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={false}
        />
      </div>
    </React.Fragment>
  );
}

export default SmallMonthlyBarChart;
