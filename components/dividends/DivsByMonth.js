import styles from "./DivsByMonth.module.scss";
import { useState, useEffect } from "react";
import MonthRow from "./MonthRow";
import { v4 as uuidv4 } from "uuid";

function DivsByMonth({ dividends, yearState }) {
  // States
  const [monthsObject, setMonthsObject] = useState({});

  useEffect(() => {
    createMonthsObj();
  }, []);

  function createMonthsObj() {
    const monthsObj = {};

    dividends.forEach((div) => {
      const monthsObjKeys = Object.keys(monthsObj);
      if (!monthsObjKeys.includes(div.year)) {
        monthsObj[div.year] = [
          { 0: [] },
          { 1: [] },
          { 2: [] },
          { 3: [] },
          { 4: [] },
          { 5: [] },
          { 6: [] },
          { 7: [] },
          { 8: [] },
          { 9: [] },
          { 10: [] },
          { 11: [] },
        ];
      }
    });

    dividends.forEach((div) => {
      monthsObj[div.year][div.month][div.month].push(div);
    });

    setMonthsObject(monthsObj);
  }

  return (
    <div className={styles.componentContainer}>
      {monthsObject[yearState] &&
        monthsObject[yearState].map((month, index) => {
          if (month[index].length === 0) {
            return;
          }
          return (
            <MonthRow
              monthNumber={index}
              year={yearState}
              monthArray={month[index]}
              key={uuidv4()}
            />
          );
        })}
    </div>
  );
}

export default DivsByMonth;
