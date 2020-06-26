import SidebarMenu from "../../components/styled/SidebarMenu";
import PortfolioTable from "../../components/portfolio/index/PortfolioTable";
import PageHeading from "../../components/styled/PageHeading";
import SectionHeading from "../../components/styled/SectionHeading";
import styles from "./index.module.scss";
import { useEffect, useContext, useState } from "react";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import PortfolioPie from "../../components/portfolio/index/PortfolioPie";
import LoadingSpinner from "../../components/styled/LoadingSpinner";
import Link from "next/link";
import Footer from "../../components/styled/Footer";

function index({ ctx, user }) {
  const portfolioContext = useContext(PortfolioContext);
  const { portfolio, getPortfolio, showZeroPositions } = portfolioContext;

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    // get data
    async function getData() {
      if (portfolio.length === 0) {
        console.log("getting portfolio");
        const res = await getPortfolio(ctx);
      } else {
        console.log("portfolio array is not zero");
      }
      console.log("setting component to true");
      setShowComponent(true);
    }

    getData();
  }, []);

  if (!showComponent) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="My Portfolio" />
        <div className={styles.contentContainer}>
          <div className={styles.loadingSpinnerContainer}>
            <LoadingSpinner size="small" />
          </div>
          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  if (showZeroPositions) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="My Portfolio" />
        <div className={styles.contentContainer}>
          <div className={styles.messageContainer}>
            <h2>You have zero positions in your portfolio.</h2>
            <Link href="/edit/portfolio">
              <a className={styles.btn}>&#43;&nbsp;Add positions</a>
            </Link>
          </div>

          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="My Portfolio" />
      <div className={styles.contentContainer}>
        <div>
          <SectionHeading text="Portfolio Pie" />
          <PortfolioPie portfolio={portfolio} />
          <SectionHeading text="Portfolio Positions" />
          <PortfolioTable portfolio={portfolio} />
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default index;
