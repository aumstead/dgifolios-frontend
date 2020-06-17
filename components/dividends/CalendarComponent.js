import { ResponsiveCalendar } from "@nivo/calendar";

function CalendarComponent({ dividends, setDaysWithDividend }) {
  const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  const oneYearAgoDateObj = new Date();
  oneYearAgoDateObj.setMonth(currentDate.getMonth() - 12);

  // calculate beginning of 12 months ago date object
  const lastYearMonth = oneYearAgoDateObj.getMonth();
  const lastYearYear = oneYearAgoDateObj.getFullYear();
  const lastYearFinalObj = new Date();
  lastYearFinalObj.setFullYear(lastYearYear, lastYearMonth, 1);

  // calculate last day of previous month from currentDate
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const mostRecentMonthFinalObj = new Date();
  mostRecentMonthFinalObj.setFullYear(currentYear, currentMonth, 0);

  // filter last 12 months' dividends into array
  const lastTwelveMonthsDivsArray = dividends.filter(
    (div) =>
      new Date(div.divDate) < mostRecentMonthFinalObj &&
      new Date(div.divDate) > lastYearFinalObj
  );

  // get strings for 'to' and 'from' nivo props
  const lastYearArray = lastYearFinalObj.toISOString().split('T')
  const lastYear = lastYearArray[0]
  const recentMonthArray = mostRecentMonthFinalObj.toISOString().split('T')
  const thisYear = recentMonthArray[0]

  let dataArray = [];
  lastTwelveMonthsDivsArray.forEach((divX) => {
    if (dataArray.some((divY) => divY["day"] === divX.divDate)) {
      const divToChange = dataArray.find(
        (divZ) => divZ["day"] === divX.divDate
      );
      divToChange.value += 1;
    } else {
      dataArray.push({ day: divX.divDate, value: 1 });
    }
  });

  // calculate days with a dividend and pass up to index page
  const days = dataArray.length
  setDaysWithDividend(days)

  return (
    <div style={{ height: "34rem", marginLeft: "6rem" }}>
      <ResponsiveCalendar
        data={dataArray}
        from={lastYear}
        to={thisYear}
        emptyColor="#eeeeee"
        colors={["#eeeeee", "#a6cee4", "#2177b4", "#b2df8a", "#32a02d", "#fa9b99"]}
        margin={{ top: 10, right: 40, bottom: 40, left: 20 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 10,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
}

export default CalendarComponent;
