import styles from "./ProfileDivsByMonth.module.scss";
import { useState, useEffect } from "react";
import ProfileMonthRow from "./ProfileMonthRow";

function ProfileDivsByMonth({ dividends, yearState }) {
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
            <ProfileMonthRow
              monthNumber={index}
              year={yearState}
              monthArray={month[index]}
            />
          );
        })}
    </div>
  );
}

export default ProfileDivsByMonth;
