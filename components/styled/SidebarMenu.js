import styles from "./SidebarMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Fuse from "fuse.js";
import { useState, useEffect, useContext } from "react";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import ExploreSvg from "../styled/svg/ExploreSvg";
import ProfileSvg from "../styled/svg/ProfileSvg";
import DividendsSvg from "../styled/svg/DividendsSvg";
import MonthlyHistorySvg from "../styled/svg/MonthlyHistorySvg";
import PortfolioSvg from "../styled/svg/PortfolioSvg";
import EditPortfolioSvg from "./svg/EditPortfolioSvg";
import EditDividendsSvg from "./svg/EditDividendsSvg";

function SidebarMenu({ children, user, ctx, username }) {
  const router = useRouter();

  const path = router.pathname;

  // Context
  const portfolioContext = useContext(PortfolioContext);
  const { portfolio, getPortfolio } = portfolioContext;
  const dividendContext = useContext(DividendContext);
  const { dividends, getDividends } = dividendContext;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [tickers, setTickers] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    // get data
    async function getData() {
      if (dividends.length === 0) {
        const res = await getDividends(ctx);
      }

      if (portfolio.length === 0) {
        const res = await getPortfolio(ctx);
      }
      setTickers(createTickersArr());
      setShowComponent(true);
    }

    getData();
  }, []);

  useEffect(() => {
    setTickers(createTickersArr());
  }, [dividends, portfolio]);

  const fuse = new Fuse(tickers, {
    threshold: 0.4,
    keys: ["ticker"],
  });

  const results = fuse.search(searchQuery);
  const tickerResults = results.map((ticker) => ticker.item);

  function createTickersArr() {
    const hashTable = {};
    for (let i = 0; i < dividends.length; i++) {
      if (!hashTable[dividends[i].ticker]) hashTable[dividends[i].ticker] = 1;
    }
    for (let i = 0; i < portfolio.length; i++) {
      if (!hashTable[portfolio[i].ticker]) hashTable[portfolio[i].ticker] = 1;
    }

    const keysArr = Object.keys(hashTable);
    const tickers = [];
    keysArr.forEach((key) => {
      tickers.push({ ticker: key });
    });
    return tickers;
  }

  function handleSearchChange(e) {
    const { value } = e.target;
    setSearchQuery(value);
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      router.push(
        `/portfolio/[ticker]?ticker=${tickerResults[0].ticker}`,
        `/portfolio/${tickerResults[0].ticker}`
      );
      document.getElementById("inputSearchId").blur();
    }
  }

  function handleMouseDown(e) {
    router.push(
      `/portfolio/[ticker]?ticker=${e.target.innerHTML}`,
      `/portfolio/${e.target.innerHTML}`
    );
  }

  if (!user) {
    return (
      <>
        <nav className={styles.menu}>
          <ul>
            <li className={styles.actionLink__li}>
              <Link href="/signin">
                <a className={styles.actionLink}>Sign in &#8594;</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a className={styles.actionLink}>Create an account &#8594;</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={path === "/explore" ? styles.contentExplore : styles.content}>{children}</div>
      </>
    );
  }

  if (!showComponent) {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <LoadingSpinner size="big" />
      </div>
    );
  }

  return (
    <>
      <nav className={styles.menu}>
        <div className={styles.menu__section}>
          <h6 className={`${styles.sectionHeading}`}>Views</h6>

          <Link href="/portfolio">
            <a
              className={
                path === "/portfolio"
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              My Portfolio
            </a>
          </Link>

          <Link href="/dividends">
            <a
              className={
                path === "/dividends"
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              My Dividends
            </a>
          </Link>

          <Link href="/dividends/monthly">
            <a
              className={
                path === "/dividends/monthly"
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              Monthly History
            </a>
          </Link>
        </div>

        <div className={`${styles.menu__section} ${styles.search}`}>
          <h6 className={`${styles.sectionHeading}`}>Search My Tickers</h6>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            name="searchInput"
            autoComplete="off"
            placeholder="i.e. AAPL, VZ"
            className={styles.searchInput}
            onKeyUp={handleKeyUp}
            id="inputSearchId"
            onBlur={() => setSearchQuery("")}
          />
          <div className={styles.search__ulContainer}>
            {tickerResults.length > 0 && (
              <ul className={styles.search__ul}>
                {tickerResults.map((ticker) => (
                  <li
                    onMouseDown={handleMouseDown}
                    className={styles.search__li}
                    key={uuidv4()}
                  >
                    {ticker.ticker}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.menu__section}>
          <h6 className={`${styles.sectionHeading}`}>Data</h6>

          <Link href="/edit/portfolio">
            <a
              className={
                path === "/edit/portfolio"
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              Edit Portfolio Data
            </a>
          </Link>

          <Link href="/edit/dividends">
            <a
              className={
                path === "/edit/dividends"
                  ? `${styles.menuItem} ${styles.active}`
                  : styles.menuItem
              }
            >
              Edit Dividend Data
            </a>
          </Link>
        </div>
      </nav>

      {/* mobile menu */}
      <nav className={styles.mobileMenu}>
        <div className={`${styles.mobileSearch}`}>
          <h6 className={`${styles.sectionHeading}`}>Search My Tickers</h6>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            name="searchInput"
            autoComplete="off"
            placeholder="i.e. AAPL, VZ"
            className={styles.searchInput}
            onKeyUp={handleKeyUp}
            id="inputSearchId"
            onBlur={() => setSearchQuery("")}
          />
          <div className={styles.search__ulContainer}>
            {tickerResults.length > 0 && (
              <ul className={styles.search__ul}>
                {tickerResults.map((ticker) => (
                  <li
                    onMouseDown={handleMouseDown}
                    className={styles.search__li}
                    key={uuidv4()}
                  >
                    {ticker.ticker}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.mobileEditSection}>
          <h6 className={`${styles.sectionHeading}`}>Edit Data</h6>
          <div className={styles.mobileEditSection__links}>
            <Link href="/edit/portfolio">
              <a
                className={
                  path === "/edit/portfolio"
                    ? `${styles.mobileEditMenuItem} ${styles.mobileNavActive}`
                    : styles.mobileEditMenuItem
                }
              >
                <EditPortfolioSvg />
                <p>Portfolio Data</p>
              </a>
            </Link>

            <Link href="/edit/dividends">
              <a
                className={
                  path === "/edit/dividends"
                    ? `${styles.mobileEditMenuItem} ${styles.mobileNavActive}`
                    : styles.mobileEditMenuItem
                }
              >
                <EditDividendsSvg />
                <p>Dividend Data</p>
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.mobileMenuNavigation}>
          {/* <h6 className={`${styles.sectionHeading}`}>Views</h6> */}

          <Link href="/portfolio">
            <a
              className={
                path === "/portfolio"
                  ? `${styles.mobileNavItem} ${styles.mobileNavActive}`
                  : styles.mobileNavItem
              }
            >
              <PortfolioSvg />
              My Portfolio
            </a>
          </Link>

          <Link href="/dividends">
            <a
              className={
                path === "/dividends"
                  ? `${styles.mobileNavItem} ${styles.mobileNavActive}`
                  : styles.mobileNavItem
              }
            >
              <DividendsSvg />
              My Dividends
            </a>
          </Link>

          <Link href="/dividends/monthly">
            <a
              className={
                path === "/dividends/monthly"
                  ? `${styles.mobileNavItem} ${styles.mobileNavActive}`
                  : styles.mobileNavItem
              }
            >
              <MonthlyHistorySvg />
              Monthly History
            </a>
          </Link>

          <Link href="/explore">
            <a
              className={
                path === "/explore"
                  ? `${styles.mobileNavItem} ${styles.mobileNavActive}`
                  : styles.mobileNavItem
              }
            >
              <ExploreSvg />
              Explore
            </a>
          </Link>
          
          <Link href={`/profile/${user.username}`}>
            <a
              className={
                username === user.username
                  ? `${styles.mobileNavItem} ${styles.mobileNavActive}`
                  : styles.mobileNavItem
              }
            >
              <ProfileSvg username={username} user={user} />
              My profile
            </a>
          </Link>
        </div>
      </nav>
      <div className={styles.content}>{children}</div>
    </>
  );
}

export default SidebarMenu;
