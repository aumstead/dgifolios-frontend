import SidebarMenu from "../../components/styled/SidebarMenu";
import PortfolioTable from "../../components/portfolio/index/PortfolioTable";
import PageHeading from "../../components/styled/PageHeading";
import SectionHeading from "../../components/styled/SectionHeading";
import styles from "./index.module.scss";
import { useContext, useState } from "react";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import PortfolioPie from "../../components/portfolio/index/PortfolioPie";
import Link from "next/link";
import Footer from "../../components/styled/Footer";

function index({ user }) {
  const portfolioContext = useContext(PortfolioContext);
  const { portfolio, showZeroPositions } = portfolioContext;

  if (showZeroPositions) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="My Portfolio" />
        <div className={styles.contentContainerZero}>
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
