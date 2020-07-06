import { ResponsiveBar } from "@nivo/bar";

function BarChartComponent({ data, xAxisObject, yScaleObject }) {
  return (
    <ResponsiveBar
      data={data}
      keys={["dividends"]}
      indexBy="year"
      margin={{ top: 30, right: 20, bottom: 50, left: 55 }}
      padding={0.3}
      colors={[
        "#a6cee3",
        "#1f78b4",
        "#b2df8a",
        "#33a02c",
        "#fb9a99",
        "#e31a1c",
        "#fdbf6f",
        "#ff7f00",
        "#cab2d6",
        "#6a3d9a",
        "#b15928",
      ]}
      maxValue={yScaleObject.yMax}
      enableLabel={false}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: "Year",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Annual Dividends",
        legendPosition: "middle",
        legendOffset: -48,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
}

export default BarChartComponent;
