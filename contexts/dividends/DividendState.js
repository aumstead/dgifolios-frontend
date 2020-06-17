import { useState } from 'react'
import DividendContext from './DividendContext'
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'
import { parseCookies } from "nookies";
import sort from 'fast-sort'

function DividendState({ children }) {
  const [dividends, setDividends] = useState([])
  const [years, setYears] = useState([])
  const [allTimeRankings, setAllTimeRankings] = useState([])
  const [lastTwelveMonthYield, setLastTwelveMonthYield] = useState("");
  const [showZeroDividends, setShowZeroDividends] = useState(false)

  const yearsArray = [];

  async function getDividends(ctx) {
    try {
      const url = `${baseUrl}/dividends`;
      const { token } = parseCookies(ctx);
      if (!token) {
        console.log("login to gain access");
        router.push("/signin");
      }
      const payload = { headers: { Authorization: token } };
      const response = await axios.get(url, payload);

      if (response.data.length === 0) {
        setShowZeroDividends(true);
      }

      const data = makeCalculations(response.data)
      calculateAllTimeDividends(response.data)
      setDividends(data);
      return "getDividends resolved";
    } catch (error) {
      console.error("error getting dividends");
    }
  }

  function makeCalculations(data) {
    data.forEach((div) => {
      const { divDate, amount, shares, exDivDate } = div;

      // Handle divDate DOMstring to date object
      const divDateString = divDate.toString();
      const divDateObj = new Date(divDateString);
      div.month = divDateObj.getMonth();
      div.year = divDateObj.getFullYear();
      div.day = divDateObj.getDate();

      // Handle exDivDate DOMstring to date object
      const exDivDateString = exDivDate.toString()
      const exDivDateObj = new Date(exDivDateString)
      div.exDivMonth = exDivDateObj.getMonth()
      div.exDivDay = exDivDateObj.getDate()
      div.exDivYear = exDivDateObj.getFullYear()

      // Multiply amount by shares and create total property
      div.total = Number((amount * shares).toFixed(2))

      // Add netCostBasis property
      if (div.costBasis > 0) {
        div.netCostBasis = Number((div.costBasis * div.shares).toFixed(2))
      }

      // Calculate yield on cost and add property
      if (div.frequency === "quarterly" && div.costBasis) {
        div.yield = Number((((div.amount * 4) / div.costBasis) * 100).toFixed(2))
      }

      // If yearsArray doesn't have the newly created year property, push the string to yearsArray
      if (!yearsArray.includes(div.year)) {
        yearsArray.push(div.year)
      }

      // Set states
      const sortedYears = sort(yearsArray).desc()
      setYears(sortedYears)
    })
    return data;
  }

  function calculateAllTimeDividends(dividends) {
    // All-Time rankings calculations
    const tickerList = []
    const tickerObjects = []
    dividends.forEach((div) => {
      if (!tickerList.includes(div.ticker)) {
        tickerList.push(div.ticker)
        tickerObjects.push({ ticker: div.ticker, allTimeDividends: 0 })
      }
    })
    
    tickerList.forEach((ticker) => {
      dividends.forEach((div) => {
        if (ticker === div.ticker) {
          let myObj = tickerObjects.find((obj) => obj.ticker === ticker)
          myObj.allTimeDividends += div.total
        }
      })
    })
    
    const finalRankingsArray = sort(tickerObjects).desc(obj => obj.allTimeDividends)
    setAllTimeRankings(finalRankingsArray)
  }

  return (
    <DividendContext.Provider value={{
      dividends, setDividends, getDividends, years, allTimeRankings, calculateAllTimeDividends, makeCalculations, lastTwelveMonthYield, setLastTwelveMonthYield, showZeroDividends, setShowZeroDividends
    }}>
      {children}
    </DividendContext.Provider>
  )
}

export default DividendState;