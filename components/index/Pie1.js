import { ResponsivePie } from "@nivo/pie";

function Pie1() {
  let data = [
    {
      id: "MMM",
      value: 4.2,
    },
    {
      id: "AAPL",
      value: 8,
    },
    {
      id: "SYY",
      value: 2.8,
    },
    {
      id: "JPM",
      value: 5.4,
    },
    {
      id: "T",
      value: 5.1,
    },
    {
      id: "MSFT",
      value: 6.5
    },
    {
      id: "V",
      value: 4.7
    },
    {
      id: "MA",
      value: 3.3
    },
    {
      id: "JNJ",
      value: 4.5
    },
    {
      id: "TXN",
      value: 3.9
    },
    {
      id: "XOM",
      value: 4.1
    },
    // fifty
    {
      id: "BAC",
      value: 2.6
    },
    {
      id: "SBUX",
      value: 5.9
    },
    {
      id: "WMT",
      value: 2.5
    },
    {
      id: "PEP",
      value: 6
    },
    {
      id: "PG",
      value: 3.5
    },
    {
      id: "NVDA",
      value: 2.5
    },
    {
      id: "ABT",
      value: 3
    },
    {
      id: "HD",
      value: 3.5
    },
    {
      id: "CVX",
      value: 2.7
    },
    {
      id: "NNN",
      value: 1.4
    },
    {
      id: "NKE",
      value: 2.8
    },
    {
      id: "D",
      value: 2.7
    },
    {
      id: "STOR",
      value: 2.3
    },
    {
      id: "UNP",
      value: 1
    },
    {
      id: "SJM",
      value: 1.3
    },
    {
      id: "WELL",
      value: 1.2
    },
    {
      id: "WPC",
      value: 2.6
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
      margin={{ top: 25, right: 110, bottom: 50, left: 110 }}
      enableSlicesLabels={false}
      radialLabel={function (e) {
        return e.id + " (" + e.value + "%)";
      }}
      colors={{ scheme: "paired" }}
      sortByValue={true}
      radialLabelsSkipAngle={7}
      tooltip={nivoPieTooltip}
      // radialLabelsLinkOffset={7}
      // radialLabelsLinkDiagonalLength={20}
      // radialLabelsLinkHorizontalLength={40}
      // radialLabelsTextXOffset={3}
    />
  );
}

export default Pie1;
