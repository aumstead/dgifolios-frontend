import Link from "next/link";
import styles from "./Navbar.module.scss";
import { handleLogout } from "../../utils/auth";
import { useState } from "react";
import LogoSvg from "./LogoSvg";

function Navbar({ user }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowUserMenu((prevState) => !prevState);
  }

  function handleClickList() {
    setShowUserMenu(false);
  }

  function handleClickLogout() {
    handleLogout();
    setShowUserMenu(false);
  }
  return (
    <div className={styles.navbar}>
      {showUserMenu && <div className={styles.overlay} onClick={handleClick} />}
      <div className={styles.navbar__logo}>
        <Link href="/">
          <LogoSvg />
        </Link>
      </div>

      {/* <nav className={styles.navbar__social}>
        
      </nav> */}
      <nav className={styles.navbar__links}>
        <div className={styles.navbar__linksSocial}>
          <Link href="/explore">
            <a className={styles.navbar__a}>Explore Portfolios</a>
          </Link>
          {user &&
          <Link href={`/profile/${user.username}`}>
            <a className={styles.navbar__a}>My Public Profile</a>
          </Link>}
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
            <button onClick={handleClick} className={styles.userBtn}>
              {user.username}&nbsp;
              <span className={styles.iconTriangle}>&#9660;</span>
            </button>
          )}
        </div>
      </nav>
      {user && showUserMenu && (
        <ul className={styles.ul}>
          <li onClick={handleClickList} className={styles.li}>
            <Link href={`/edit/profile`}>
              <a className={styles.a}>Edit profile</a>
            </Link>
          </li>
          <li onClick={handleClickList} className={styles.li}>
            <Link href={`#`}>
              <a className={styles.a}>Edit preferences</a>
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
  );
}

export default Navbar;
