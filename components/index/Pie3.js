import { ResponsivePie } from "@nivo/pie";

function Pie3() {
  let data = [
    {
      id: "MMM",
      value: 15,
    },
    {
      id: "VFC",
      value: 15,
    },
    {
      id: "SYY",
      value: 15,
    },
    {
      id: "JPM",
      value: 15,
    },
    {
      id: "ABBV",
      value: 15,
    },
    {
      id: "KIM",
      value: 15,
    },
    {
      id: "ENB",
      value: 10,
    },
  ];

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
    <ResponsivePie
      data={data}
      margin={{ top: 25, right: 100, bottom: 25, left: 100 }}
      enableSlicesLabels={false}
      radialLabel={function (e) {
        return e.id + " (" + e.value + "%)";
      }}
      colors={{ scheme: "paired" }}
      sortByValue={true}
      radialLabelsSkipAngle={6}
      tooltip={nivoPieTooltip}
      // radialLabelsLinkOffset={3}
      radialLabelsLinkDiagonalLength={5}
      // radialLabelsLinkHorizontalLength={40}
      // radialLabelsTextXOffset={3}
    />
  );
}

export default Pie3;
