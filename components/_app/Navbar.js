import Link from "next/link";
import styles from "./Navbar.module.scss";
import { handleLogout } from "../../utils/auth";
import { useState, useContext } from "react";
import LogoSvg from "./LogoSvg";
import DividendContext from "../../contexts/dividends/DividendContext";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";

function Navbar({ user }) {
  const dividendContext = useContext(DividendContext);
  const portfolioContext = useContext(PortfolioContext);
  const { setDividends } = dividendContext;
  const { setPortfolio } = portfolioContext;

  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowUserMenu((prevState) => !prevState);
  }

  function handleClickList() {
    setShowUserMenu(false);
  }

  function handleClickLogout() {
    setDividends([]);
    setPortfolio([]);
    handleLogout();
    setShowUserMenu(false);
  }
  return (
    <div className={styles.navbar}>
      {showUserMenu && <div className={styles.overlay} onClick={handleClick} />}
      <div className={styles.navbar__logo}>
        <Link href="/">
          <a>
            <LogoSvg />
          </a>
        </Link>
      </div>

      <nav className={styles.navbar__links}>
        <div className={styles.navbar__linksSocial}>
          <Link href="/explore">
            <a className={styles.navbar__a}>Explore Portfolios</a>
          </Link>
          {user && (
            <Link href={`/profile/${user.username}`}>
              <a className={styles.navbar__a}>My Public Profile</a>
            </Link>
          )}
        </div>
        <div className={styles.navbar__linksAccount}>
          {!user ? (
            <>
              <Link href="/signup">
                <a className={styles.navbar__a}>Create an Account</a>
              </Link>
              <Link href="/signin">
                <a className={styles.navbar__a}>Sign in</a>
              </Link>
            </>
          ) : (
            <div className={styles.userBtnContainer}>
              <button onClick={handleClick} className={styles.userBtn}>
                {user.username}&nbsp;
                <span className={styles.iconTriangle}>&#9660;</span>
              </button>
              {user && showUserMenu && (
                <ul className={styles.ul}>
                  <li onClick={handleClickList} className={styles.li}>
                    <Link href={`/edit/profile`}>
                      <a className={styles.a}>Edit profile</a>
                    </Link>
                  </li>

                  <li
                    className={`${styles.li} ${styles.liSignOut}`}
                    onClick={handleClickLogout}
                  >
                    Sign out
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
