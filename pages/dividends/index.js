import styles from "./index.module.scss";
import SidebarMenu from "../../components/styled/SidebarMenu";
import PageHeading from "../../components/styled/PageHeading";
import SectionHeading from "../../components/styled/SectionHeading";
import RecentDividends from "../../components/dividends/RecentDividends";
import UpcomingExDivDates from "../../components/dividends/UpcomingExDivDates";
import { useState, useEffect, useContext } from "react";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import Statistics from "../../components/dividends/Statistics";
import LoadingSpinner from "../../components/styled/LoadingSpinner";
import CalendarComponent from "../../components/dividends/CalendarComponent";
import CompoundingLineChart from "../../components/dividends/CompoundingLineChart";
import ReinvestedCompoundedBarChart from "../../components/dividends/ReinvestedCompoundedBarChart";
import Link from "next/link";
import Footer from "../../components/styled/Footer";
import BarChartComponent from "../../components/dividends/BarChartComponent";

function index({ ctx, user }) {
  const dividendContext = useContext(DividendContext);
  const portfolioContext = useContext(PortfolioContext);
  const { dividends, getDividends, showZeroDividends } = dividendContext;
  const { portfolio, getPortfolio } = portfolioContext;

  // States
  const [showComponent, setShowComponent] = useState(false);
  // calculate these two stats in child components, pass back up to parent and back down to a different child
  const [daysWithDividend, setDaysWithDividend] = useState("");

  // bar chart states
  const [data, setData] = useState([]);
  const [yScaleObject, setYScaleObject] = useState({ yMin: 0, yMax: 0 });
  const [xAxisObject, setXAxisObject] = useState({});
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // get data
    async function getData() {
      if (dividends.length === 0) {
        console.log("getting dividends");
        const res = await getDividends(ctx);
        console.log(res);
      } else {
        console.log("dividends array is not zero");
      }

      if (portfolio.length === 0) {
        console.log("getting portfolio");
        const res = await getPortfolio(ctx);
        console.log(res);
      } else {
        console.log("portfolio array is not zero");
      }
      console.log("setting component to true");
      setShowComponent(true);
    }

    getData();
  }, []);

  if (showZeroDividends) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="Dividends" />
        <div className={styles.contentContainer}>
          <div className={styles.messageContainer}>
            <h2>You have zero dividends recorded.</h2>
            <Link href="/edit/dividends">
              <a className={styles.btnZero}>&#43;&nbsp;Add dividends</a>
            </Link>
          </div>
          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  if (!showComponent) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="Dividends" />
        <div className={styles.contentContainer}>
          <div className={styles.loadingSpinnerContainer}>
            <LoadingSpinner size="small" />
          </div>
          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="My Dividends" />
      <div className={styles.contentContainer}>
        <SectionHeading text="Statistics" />
        <Statistics portfolio={portfolio} daysWithDividend={daysWithDividend} />

        {/* <SectionHeading text="Upcoming Dividends" />
        <RecentDividends /> */}

        <SectionHeading text="Approaching Ex-Dividend Dates" explanation={"(programatically estimated)"}/>
        <UpcomingExDivDates dividends={dividends} />

        <SectionHeading
          text="Days With Dividend Payments"
          explanation={"(from the last 12 months)"}
        />
        <CalendarComponent
          dividends={dividends}
          setDaysWithDividend={setDaysWithDividend}
        />

        {/* <SectionHeading
          text="Annual Dividend Growth Visualizer"
          explanation="Calculates compounded annual dividends based on organic dividend growth. (i.e. a company raising their dividend or an accumulation of raises within a portfolio)"
        />
        <CompoundingLineChart dividends={dividends} /> */}

        <SectionHeading
          text="My Portfolio's Annual Dividends Visualizer"
          // explanation="Calculates compounded annual dividends based solely on organic dividend growth."
        />
        <p className={`${styles.explanation} ${styles.mt_1}`}>
          Shows the future amount of dividends your portfolio will yield
          annually based on your portolfio's total current value and an annual
          dividend yield of your choice.
        </p>
        <p className={styles.explanation}>
          Dividend growth can be accounted for in "Annual Dividend Growth Rate".
        </p>
        <p className={styles.explanation}>
          In this calculation, dividends are reinvested and compounded annually.
        </p>
        <ReinvestedCompoundedBarChart
          dividends={dividends}
          setData={setData}
          setShowChart={setShowChart}
          setXAxisObject={setXAxisObject}
          setYScaleObject={setYScaleObject}
        />
        <div className={showChart ? styles.barChartContainer : styles.hideBarChartContainer}>
          {showChart && (
            <BarChartComponent
              data={data}
              xAxisObject={xAxisObject}
              yScaleObject={yScaleObject}
            />
          )}
        </div>

        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default index;
