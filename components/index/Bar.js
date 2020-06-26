import { ResponsiveBar } from "@nivo/bar";

function Bar() {
  // const years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  const years = [2016, 2017, 2018, 2019, 2020];
  const data = [
    {
      month: "Jan",
      2016: 44.35,
      2017: 90.14,
      2018: 163.21,
      2019: 211.28,
      2020: 221.78
    },
    {
      month: "Feb",
      2016: 49.76,
      2017: 119.98,
      2018: 177.4,
      2019: 190.43,
      2020: 287.90
    },
    {
      month: "March",
      2016: 99.11,
      2017: 143.36,
      2018: 169.01,
      2019: 170.47,
      2020: 211.25
    },
    {
      month: "April",
      2016: 58.23,
      2017: 133.83,
      2018: 131.44,
      2019: 220.33,
      2020: 256.90
    },
    {
      month: "May",
      2016: 81.90,
      2017: 158.42,
      2018: 179.37,
      2019: 254.4,
      2020: 289.1
    },
    {
      month: "June",
      2016: 88.3,
      2017: 147.32,
      2018: 174.11,
      2019: 245.99,
      2020: 310.10
    },
    {
      month: "July",
      2016: 69.10,
      2017: 197.98,
      2018: 160.59,
      2019: 213.47,
      2020: 274.36
    },
    {
      month: "Aug",
      2016: 90.54,
      2017: 159.7,
      2018: 204.43,
      2019: 257.33,
      2020: 265.91
    },
    {
      month: "Sept",
      2016: 120.11,
      2017: 207.34,
      2018: 211.85,
      2019: 235.78,
      2020: 311.6
    },
    {
      month: "Oct",
      2016: 99.56,
      2017: 143.82,
      2018: 197.89,
      2019: 265.46,
      2020: 244.12
    },
    {
      month: "Nov",
      2016: 104,
      2017: 135.99,
      2018: 243.5,
      2019: 249.31,
      2020: 331.86
    },
    {
      month: "Dec",
      2016: 111.89,
      2017: 166.39,
      2018: 231.90,
      2019: 276.43,
      2020: 315.77
    },
  ];

  function calcData() {
    years.forEach((year) => {
      data.forEach((obj) => {
        if (!obj[year]) obj[year] = 0;
      });
    });

    let bank = 50000;
    let year = years[0];
    let monthCount = 0;
    let quarterDivs = 0;

    for (let i = 0; i < years.length * 12; i++) {

      let monthlyDivs = (bank * 0.035) / 12;

      data[monthCount][year] = monthlyDivs.toFixed(2);

      if (monthCount === 11) {
        monthCount = 0;
        year++;
      }
      monthCount++;

      bank += 1000;

      quarterDivs += monthlyDivs;
      console.log(i, bank);
      // if end of quarter, add quarter divs to bank so they are compounding
      if (
        monthCount === 2 ||
        monthCount === 5 ||
        monthCount === 8 ||
        monthCount === 11
      ) {
        bank += quarterDivs;
        quarterDivs = 0;
        console.log("added quarter divs", bank);
      }
    }

    console.log(data);
  }

  return (
    <ResponsiveBar
      data={data}
      keys={years}
      indexBy="month"
      margin={{ top: 25, right: 100, bottom: 50, left: 80 }}
      padding={0.3}
      groupMode="grouped"
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
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Monthly Total",
        legendPosition: "middle",
        legendOffset: -55,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      enableLabel={false}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 10,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={false}
    />
  );
}

export default Bar;
