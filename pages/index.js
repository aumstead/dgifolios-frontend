import styles from "./index.module.scss";
import Link from "next/link";
import AngleDownSvg from "../components/index/AngleDownSvg";
import Pie1 from "../components/index/Pie1";
import Pie2 from "../components/index/Pie2";
import Bar from "../components/index/Bar";
import Footer from "../components/styled/Footer";
import { useRef, useEffect } from 'react'

function Home(props) {
  const seeFeaturesRef = useRef(null)

  useEffect(() => {
    const homePageOptions = {
      rootMargin: "-70% 0px 0px 0px"
    };
    const homePageObserver = new IntersectionObserver(function(
      entries
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          seeFeaturesRef.current.classList.add(styles.fadeOut)
        } else {
          seeFeaturesRef.current.classList.remove(styles.fadeOut)
        }
      });
    },
    homePageOptions);
  
    homePageObserver.observe(seeFeaturesRef.current);
    return () => {
      homePageObserver.unobserve(seeFeaturesRef.current);
  };
  }, [])

  return (
    <>
      <div className={styles.heroSectionContainer}>
        <div className={styles.heroSection__titleContainer}>
          <h1 className={styles.title}>
            Dividend investing, tracking, and sharing.
          </h1>
          {/* <h3 className={styles.subheading}>100% free. Forever.</h3> */}
          <h4 className={styles.heroText}>
            <span className={styles.logoText}>
              <span className={styles.grayText}>dgi</span>&nbsp;
              <span className={styles.greenText}>folios</span>&nbsp;
            </span>
            is an app that tracks your dividends with complete accuracy because
            you control the data.
          </h4>
          <Link href="/signup">
            <a className={styles.cta}>Create an account</a>
          </Link>
        </div>
        <div className={styles.guideContainer} ref={seeFeaturesRef}>
          <span className={styles.guideText}>See features</span>
          <AngleDownSvg />
        </div>
      </div>

      <section className={styles.pieSectionContainer}>
        <h2 className={styles.pieSection__heading}>
          See how other dividend growth investors construct their portfolios
        </h2>
        <div className={styles.piesContainer}>
          <div className={styles.pie1Container}>
            <Pie1 />
          </div>
          <div className={styles.pie2Container}>
            <Pie2 />
          </div>
        </div>
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileSection__left}>
          <h2 className={styles.profileSection__Heading}>
            Share info and stats about your portfolio with other dividend growth
            investors.
          </h2>
        </div>
        <div className={styles.profileSection__right}>
          <div className={styles.profileSection__screen}>
            <img
              src="/images/screen.png"
              alt="Screenshot of public profile example."
              className={styles.profileSection__image}
            />
          </div>
        </div>
      </section>

      <section className={styles.stockSection}>
        <h2 className={styles.stockSection__heading}>
          Every stock that ever paid you a dividend has its own page with
          historical data.
        </h2>
        <div className={styles.stockSection__imageContainer}>
          <div className={styles.stockSection__left}>
            <img
              className={styles.stockSection__stockPageImage}
              src="/images/stock.png"
              alt="Screenshot of a stock's individual page."
            />
          </div>
          <div className={styles.stockSection__right}>
            <img
              className={styles.stockSection__stockChartsImage}
              src="/images/stockcharts.png"
              alt="Line charts for a stock's dividend history."
            />
          </div>
        </div>
      </section>

      <section className={styles.dataSection}>
        <div className={styles.dataSection__left}>
          <Bar />
        </div>
        <div className={styles.dataSection__right}>
          <h2 className={styles.dataSection__heading}>
            Enter your data and get fun stats such as your monthly income over
            time.
          </h2>
        </div>
      </section>

      <section className={styles.signupSection}>
        <h2 className={styles.signupSection__heading}>
          <span className={styles.signupSection__logoText}>
            <span className={styles.grayText}>dgi</span>&nbsp;
            <span className={styles.greenText}>folios</span>&nbsp;
          </span>
          is free and made for the dgi community.
        </h2>
        <Link href="/signup">
          <a className={styles.signupSection__cta}>Create an account</a>
        </Link>
        <h3 className={styles.signupSection__text}>
          If you have any questions or ideas contact me at
          dgifolios@gmail.com.
        </h3>
      </section>

      <Footer />
    </>
  );
}

export default Home;
