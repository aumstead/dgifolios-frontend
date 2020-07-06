import { ResponsivePie } from "@nivo/pie";

function MobilePie2() {
  let data = [
    {
      id: "VOO",
      value: 35,
    },
    {
      id: "VIG",
      value: 10,
    },
    {
      id: "VYM",
      value: 10,
    },
    {
      id: "BND",
      value: 10,
    },
    {
      id: "GLD",
      value: 10,
    },
    {
      id: "AAPL",
      value: 2,
    },
    {
      id: "MSFT",
      value: 2,
    },
    {
      id: "V",
      value: 2,
    },
    {
      id: "KO",
      value: 2,
    },
    {
      id: "JNJ",
      value: 1,
    },
    {
      id: "KHC",
      value: 1,
    },
    {
      id: "EMR",
      value: 1,
    },
    {
      id: "HD",
      value: 1,
    },
    {
      id: "LOW",
      value: 2,
    },
    {
      id: "GIS",
      value: 2,
    },
    {
      id: "DLR",
      value: 2,
    },
    {
      id: "DIS",
      value: 2,
    },
    {
      id: "MO",
      value: 1,
    },
    {
      id: "CVS",
      value: 1,
    },
    {
      id: "O",
      value: 1,
    },
    {
      id: "VFC",
      value: 1,
    },
    {
      id: "UPS",
      value: 1,
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

  const theme = {
    fontSize: 8,
  };

  return (
    <ResponsivePie
      theme={theme}
      data={data}
      margin={{ top: 30, right: 90, bottom: 15, left: 90 }}
      enableSlicesLabels={false}
      radialLabel={function (e) {
        return e.id + " (" + e.value + "%)";
      }}
      colors={{ scheme: "paired" }}
      sortByValue={true}
      radialLabelsSkipAngle={8}
      tooltip={nivoPieTooltip}
      // radialLabelsLinkOffset={3}
      radialLabelsLinkDiagonalLength={10}
      radialLabelsLinkHorizontalLength={10}
      // radialLabelsTextXOffset={3}
    />
  );
}

export default MobilePie2;
