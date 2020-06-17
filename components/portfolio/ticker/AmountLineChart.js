import { ResponsiveLine } from "@nivo/line";
import sort from 'fast-sort'

function AmountLineChart({ dividends, ticker }) {
  const tickerDividends = dividends.filter((div) => div.ticker === ticker)

  if (tickerDividends.length === 0) {
    return <p style={{fontSize: "1.3rem", marginLeft: "6rem", marginTop: "1rem"}}>No dividend history.</p>
  }

  const dataGather = []
  tickerDividends.forEach((div) => {
    dataGather.push({
      "x": div.divDate,
      "y": div.amount
    })
  })
  const sortedDataGather = sort(dataGather).asc(div => div.x)
  
  const data = [
    {
      "id": "Amount per share",
      "color": "hsl(334, 70%, 50%)",
      "data": sortedDataGather
    }
  ]

  const yScaleObject = getYScale(sortedDataGather)

  let width = ''
  if (sortedDataGather.length <= 3) {
    width = "55rem"
  } else {
    width = "70rem"
  }

  function getYScale(data) {
    sort(data).asc((div) => div.y)
    const lastIndex = data.length - 1
    const difference = data[lastIndex].y - data[0].y
    const yScale = difference / 2
    const yMax = data[lastIndex].y + yScale
    const yMin = data[0].y -yScale

    if (yMin <= 0) {
      yMin = 0
    }
    
    return ({ yMax, yMin })
  }
  
  return (
    <div style={{ height: "30rem", width: width, marginLeft: "6rem" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 150, bottom: 50, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: yScaleObject.yMin,
          max: yScaleObject.yMax,
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Payout Date",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Amount/Share",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        colors={{ scheme: "paired" }}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default AmountLineChart;
