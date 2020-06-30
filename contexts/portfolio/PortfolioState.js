import { useState } from "react";
import PortfolioContext from "./PortfolioContext";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { parseCookies } from "nookies";

function PortfolioState({ children }) {
  const [portfolio, setPortfolio] = useState([]);
  // a state used if user has not yet entered any portfolio data
  const [showZeroPositions, setShowZeroPositions] = useState(false);
  const [totalInvestedCapital, setTotalInvestedCapital] = useState()

  async function getPortfolio(ctx) {
    try {
      const url = `${baseUrl}/portfolio`;
      const { token } = parseCookies(ctx);
      if (!token) {
        router.push("/signin");
      }
      const payload = { headers: { Authorization: token } };
      const response = await axios.get(url, payload);

      if (response.data.length === 0) {
        setShowZeroPositions(true);
      }

      const data = makeCalculations(response.data);

      setPortfolio(data);
      return "getPortfolio resolved"
    } catch (error) {
      console.error(error, "Error getting portfolio");
    }
  }

  
  function makeCalculations(data) {  
    let totalPortfolioInvestedCapital = 0;
    data.forEach((position) => {
      position.investedCapital = Number(
        (position.costBasis * position.shares).toFixed(2)
      );
      totalPortfolioInvestedCapital += position.investedCapital;
    });

    setTotalInvestedCapital(totalPortfolioInvestedCapital)

    // Second loop with totalPortfolioInvestedCapital value
    data.forEach((position) => {
      position.percentOfPortfolio = ((position.investedCapital / totalPortfolioInvestedCapital) * 100).toFixed(1)
    })
    return data;
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        getPortfolio,
        showZeroPositions,
        setShowZeroPositions,
        totalInvestedCapital,
        makeCalculations
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioState;
