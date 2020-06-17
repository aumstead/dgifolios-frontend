import styles from "./SidebarMenu.module.scss";
import Link from "next/link";
import { useRouter } from 'next/router'

function SidebarMenu({ children, user }) {
  const router = useRouter()

  const path = router.pathname

  if (!user) {
    return (
      <>
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link href="/portfolio">
                <a>Create an account!</a>
              </Link>
            </li>
            <li>
              <Link href="/dividends">
                <a>Sign in &#8594;</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>{children}</div>
      </>
    );
  }

  return (
    <>
      <nav className={styles.menu}>
        <div className={styles.menu__section}>
          <h6 className={`${styles.sectionHeading}`}>
            Views
          </h6>
          
            <Link href="/portfolio">
              <a className={path === '/portfolio' ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
                My Portfolio
              </a>
            </Link>
          
          
            <Link href="/dividends">
              <a className={path === '/dividends' ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
                My Dividends
              </a>
            </Link>
          
          
            <Link href="/dividends/monthly">
              <a className={path === '/dividends/monthly' ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
                Monthly History
              </a>
            </Link>
          
        </div>

        <div className={styles.menu__section}>
          <h6 className={`${styles.sectionHeading}`}>
            Data
          </h6>
          
            <Link href="/edit/portfolio">
              <a className={path === '/edit/portfolio' ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
                Edit Portfolio Data
              </a>
            </Link>
          
          
            <Link href="/edit/dividends">
              <a className={path === '/edit/dividends' ? `${styles.menuItem} ${styles.active}` : styles.menuItem}>
                Edit Dividend Data
              </a>
            </Link>
          
        </div>
      </nav>
      <div className={styles.content}>{children}</div>
    </>
  );
}

export default SidebarMenu;
