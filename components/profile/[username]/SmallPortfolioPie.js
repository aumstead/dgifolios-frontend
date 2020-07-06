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

  const mobileTheme = {
    fontSize: 8,
  }

  return (
    <React.Fragment>
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

      <div className={styles.mobilePieContainer}>
        <ResponsivePie
          theme={mobileTheme}
          data={data}
          margin={{ top: 30, right: 30, bottom: 30, left: 50 }}
          enableSlicesLabels={false}
          radialLabel={function (e) {
            return e.id + " (" + e.value + "%)";
          }}
          colors={{ scheme: "paired" }}
          sortByValue={true}
          radialLabelsSkipAngle={8}
          tooltip={nivoPieTooltip}
          enableRadialLabels={true}
          // radialLabelsLinkOffset={2}
          radialLabelsLinkDiagonalLength={5}
          radialLabelsLinkHorizontalLength={5}
          // radialLabelsTextXOffset={3}
        />
      </div>
    </React.Fragment>
  );
}

export default PortfolioPie;
