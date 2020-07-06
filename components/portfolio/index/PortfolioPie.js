import styles from "./PortfolioPie.module.scss";
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
    <>
      <div className={styles.pieContainer}>
        <ResponsivePie
          data={data}
          margin={{ top: 25, right: 150, bottom: 50, left: 150 }}
          enableSlicesLabels={false}
          radialLabel={function (e) {
            return e.id + " (" + e.value + "%)";
          }}
          colors={{ scheme: "paired" }}
          sortByValue={true}
          radialLabelsSkipAngle={6}
          tooltip={nivoPieTooltip}
        />
      </div>
      <div className={styles.mobilePie}>
        <ResponsivePie
          data={data}
          margin={{ top: 35, right: 25, bottom: 25, left: 25 }}
          // enableRadialLabels={false}
          radialLabelsLinkHorizontalLength={15}
          radialLabelsLinkDiagonalLength={12}
          enableSlicesLabels={false}
          colors={{ scheme: "paired" }}
          sortByValue={true}
          radialLabelsSkipAngle={10}
          tooltip={nivoPieTooltip}
        />
      </div>
    </>
  );
}

export default PortfolioPie;
