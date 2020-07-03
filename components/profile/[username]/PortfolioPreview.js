import styles from "./PortfolioPreview.module.scss";
import SmallPortfolioPie from "./SmallPortfolioPie";
import sort from "fast-sort";
import PositionRow from "./PositionRow";
import { v4 as uuidv4 } from "uuid";

function PortfolioPreview({ portfolio, user, setShowModalPie, setShowModalPortfolio }) {
  const sortedPositions = sort(portfolio).desc(
    (position) => position.investedCapital
  );
  const topFive = [];
  topFive.push(sortedPositions[0]);
  if (sortedPositions[1]) topFive.push(sortedPositions[1]);
  if (sortedPositions[2]) topFive.push(sortedPositions[2]);
  if (sortedPositions[3]) topFive.push(sortedPositions[3]);
  if (sortedPositions[4]) topFive.push(sortedPositions[4]);

  return (
    <div className={styles.componentContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.topFiveContainer}>
          <h3 className={styles.heading}>Top Holdings</h3>
          <div className={styles.headingsGridContainer}>
            <span>Ticker</span>
            <span>Shares</span>
            <span>% of portfolio</span>
          </div>
          {topFive.map((position) => (
            <PositionRow
              ticker={position.ticker}
              shares={position.shares}
              percent={position.percentOfPortfolio}
              key={uuidv4()}
            />
          ))}
          <button onClick={() => setShowModalPortfolio(true)} className={`${styles.btn} ${styles.btnPortfolio}`}>View Portfolio<span></span></button>
        </div>

        <div className={styles.pieContainer}>
          {/* <h3 className={styles.heading}>Portfolio Pie</h3> */}
          <SmallPortfolioPie portfolio={portfolio} />
          <button onClick={() => setShowModalPie(true)} className={`${styles.btn} ${styles.btnPie}`}>Enlarge<span></span></button>
        </div>
      </div>

     
     
      {/* <Footer></Footer> */}
    </div>
  );
}

export default PortfolioPreview;
