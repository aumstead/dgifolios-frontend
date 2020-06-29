import SidebarMenu from "../../components/styled/SidebarMenu";
import styles from "./[ticker].module.scss";
import { useContext } from "react";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import DividendContext from "../../contexts/dividends/DividendContext";
import PageHeading from "../../components/styled/PageHeading";
import TickerInfo from "../../components/portfolio/ticker/TickerInfo";
import SectionHeading from "../../components/styled/SectionHeading";
import TickerHistory from "../../components/portfolio/ticker/TickerHistory";
import Footer from "../../components/styled/Footer";
import AmountLineChart from "../../components/portfolio/ticker/AmountLineChart";
import TotalLineChart from "../../components/portfolio/ticker/TotalLineChart";

function ticker({ ticker, user }) {
  // Contexts
  const portfolioContext = useContext(PortfolioContext);
  const { portfolio } = portfolioContext;
  const dividendContext = useContext(DividendContext);
  const { dividends, allTimeRankings } = dividendContext;



  // useEffect(() => {
  //   // get data
  //   async function getData() {
  //     if (dividends.length === 0) {
  //       console.log("getting dividends");
  //       const resDividends = await getDividends(ctx);
  //       console.log(resDividends);
  //     } else {
  //       console.log("dividends array is not zero");
  //     }

  //     if (portfolio.length === 0) {
  //       console.log("getting portfolio");
  //       const resPortfolio = await getPortfolio(ctx);
  //       console.log(resPortfolio);
  //     } else {
  //       console.log("portfolio array is not zero");
  //     }
  //     console.log("setting component to true");
  //     setShowComponent(true);
  //   }

  //   getData();
  // }, []);

  // if (!showComponent) {
  //   return (
  //     <SidebarMenu user={user}>
  //       <div className={styles.contentContainer}>
  //         <PageHeading text={`${ticker}`} />
  //         <div className={styles.loadingSpinnerContainer}>
  //           <LoadingSpinner size="small" />
  //         </div>
  //         <Footer />
  //       </div>
  //     </SidebarMenu>
  //   );
  // }

  

  return (
    <SidebarMenu user={user}>
      <div className={styles.contentContainer}>
        <PageHeading text={ticker} />
        <TickerInfo
          portfolio={portfolio}
          dividends={dividends}
          ticker={ticker}
          allTimeRankings={allTimeRankings}
        />
        <SectionHeading text={`My ${ticker} Dividend History`} />
        <TickerHistory dividends={dividends} ticker={ticker} />
        <SectionHeading text={"Dividend Amount"} />
        <AmountLineChart dividends={dividends} ticker={ticker} />
        <SectionHeading text={`Cash Received`} />
        <TotalLineChart dividends={dividends} ticker={ticker} />
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export async function getServerSideProps(context) {
  const { ticker } = context.query;
  return {
    props: {
      ticker: ticker,
    },
  };
}

export default ticker;
