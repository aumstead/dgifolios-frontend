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
import CalendarComponent from "../../components/dividends/CalendarComponent";
import CompoundingLineChart from "../../components/dividends/CompoundingLineChart";
import ReinvestedCompoundedBarChart from "../../components/dividends/ReinvestedCompoundedBarChart";
import Link from "next/link";
import Footer from "../../components/styled/Footer";
import BarChartComponent from "../../components/dividends/BarChartComponent";
import MobileBarChartComponent from '../../components/dividends/MobileBarChartComponent'

function index({ user }) {
  const dividendContext = useContext(DividendContext);
  const portfolioContext = useContext(PortfolioContext);
  const { dividends, showZeroDividends } = dividendContext;
  const { portfolio } = portfolioContext;

  // States
  // calculate these two stats in child components, pass back up to parent and back down to a different child
  const [daysWithDividend, setDaysWithDividend] = useState("");

  // bar chart states
  const [data, setData] = useState([]);
  const [yScaleObject, setYScaleObject] = useState({ yMin: 0, yMax: 0 });
  const [xAxisObject, setXAxisObject] = useState({});
  const [showChart, setShowChart] = useState(false);

  if (showZeroDividends) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="Dividends" />
        <div className={styles.contentContainerZero}>
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

  return (
    <SidebarMenu user={user}>
      <PageHeading text="My Dividends" />
      <div className={styles.contentContainer}>
        <SectionHeading text="Statistics" />
        <Statistics portfolio={portfolio} daysWithDividend={daysWithDividend} />

        {/* <SectionHeading text="Upcoming Dividends" />
        <RecentDividends /> */}

        <SectionHeading text="Approaching Ex-Dividend Dates" explanation={"(Programatically estimated)"}/>
        <UpcomingExDivDates dividends={dividends} />

        <SectionHeading
          text="Days With Dividend Payments"
          explanation={"(From the last 12 months)"}
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

        <div className={showChart ? styles.mobileBarChartContainer : styles.hideBarChartContainer}>
          {showChart && (
            <MobileBarChartComponent
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
