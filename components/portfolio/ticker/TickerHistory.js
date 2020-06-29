import styles from "./TickerHistory.module.scss";
import { useEffect, useState } from "react";
import TickerHistoryRow from "./TickerHistoryRow";
import sort from "fast-sort";
import { v4 as uuidv4 } from 'uuid'; 

function TickerHistory({ dividends, ticker }) {
  const [data, setData] = useState([]);
  const [noDivHistory, setNoDivHistory] = useState(false)

  useEffect(() => {
    manipulateDividends();

    return () => {
      setNoDivHistory(false)
      setData([])
    }
  }, [ticker]);

  function manipulateDividends() {
    // Does this ticker actually have any dividends? Some in portfolio may not yet.
    const dividendsArray = dividends.filter((div) => div.ticker === ticker);

    if (dividendsArray.length === 0) {
      setNoDivHistory(true)
    } else {
      // Make all calculations for data object

      // Dividend Growth
      // put the ticker's dividends into asc order to get oldest div.total, so when I loop I'll hit the div that needs the div.divGrowth property
      const ascSortedArray = sort(dividendsArray).asc((div) => div.divDate);

      // get first div.total for dividend growth calculation
      let divObj = ascSortedArray[0];
      let divAmount = divObj.amount;

      ascSortedArray.forEach((div) => {
        if (divAmount !== div.amount) {
          div.divGrowth = Number(
            (((div.amount - divAmount) / divAmount) * 100).toFixed(2)
          );
          divAmount = div.amount;
        }
      });

      // sort array into descending order so that most recent year is top row
      const descSortedArray = sort(ascSortedArray).desc((div) => div.divDate);

      // Get years
      const yearsArray = [];
      const dataObjectsArray = [];
      descSortedArray.forEach((div) => {
        if (!yearsArray.includes(div.year)) {
          yearsArray.push(div.year);
        }
      });

      // Loop through years array and create yearObject
      yearsArray.forEach((year) => {
        const yearObject = {
          year: year,
          dividends: [],
        };

        // then loop through ticker's divs, and push divs to the yearObject's dividends array
        descSortedArray.forEach((div) => {
          if (div.year === yearObject.year) {
            yearObject.dividends.push(div);
          }
        });
        dataObjectsArray.push(yearObject);
      });

      // Data is set for TickerHistoryRow
      setData(dataObjectsArray);
    }
  }

  return (
    <div>
      {noDivHistory && <p style={{ fontSize: "1.4rem", marginLeft: "6rem", marginTop: "1rem"}}>No dividend history.</p>}
      {data.map((year) => (
        <TickerHistoryRow year={year.year} dividends={year.dividends} key={uuidv4()} />
      ))}
    </div>
  );
}

export default TickerHistory;
