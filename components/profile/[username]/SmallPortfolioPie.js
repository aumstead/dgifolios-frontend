import styles from "./SmallPortfolioPie.module.scss";
import { ResponsivePie } from "@nivo/pie";

function PortfolioPie({ portfolio }) {
  let data = [];
  portfolio.forEach((stock) => {
    data.push({
      id: stock.ticker,
      value: Number(stock.percentOfPortfolio),
    });
  });

  function nivoPieTooltip(e) {
    return (
      <div>
        <p>
          {e.id}: {e.value}%
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pieContainer}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
        enableSlicesLabels={false}
        radialLabel={function (e) {
          return e.id + " (" + e.value + "%)";
        }}
        colors={{ scheme: "paired" }}
        sortByValue={true}
        radialLabelsSkipAngle={6}
        tooltip={nivoPieTooltip}
        enableRadialLabels={false}
        // radialLabelsLinkOffset={3}
        // radialLabelsLinkDiagonalLength={20}
        // radialLabelsLinkHorizontalLength={40}
        // radialLabelsTextXOffset={3}
      />
    </div>
  );
}

export default PortfolioPie;
