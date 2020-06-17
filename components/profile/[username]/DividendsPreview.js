import styles from "./DividendsPreview.module.scss";
import SmallMonthlyBarChart from "./SmallMonthlyBarChart"
import ProfileMonthRow from "./ProfileMonthRow"
import Link from 'next/link'

function DividendsPreview({ dividends, years, setShowModalDividends }) {
  // handle date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const lastMonth = currentMonth - 1;
  let year = currentYear;

  if (lastMonth === 11) {
    year = year - 1;
  }

  const data = dividends.filter(
    (div) => div.year === year && div.month === lastMonth
  );
  
  return (
    <div className={styles.componentContainer}>
      <ProfileMonthRow monthNumber={lastMonth} year={year} monthArray={data} />
      <button onClick={() => setShowModalDividends(true)} className={styles.btn}>View Dividends</button>
      <h3 className={styles.heading}>Monthly Bar Chart</h3>
      <SmallMonthlyBarChart dividends={dividends} years={years} />
    </div>
  );
}

export default DividendsPreview;
