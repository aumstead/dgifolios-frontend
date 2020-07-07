import App from "next/app";
import Layout from "../components/_app/Layout";
import "../styles.css";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";
import PortfolioState from "../contexts/portfolio/PortfolioState";
import DividendState from "../contexts/dividends/DividendState";
import DateState from "../contexts/date/DateState";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
  });

  function syncLogout(event) {
    if (event.key === "logout") {
      Router.push("/signin");
    }
  }
  return (
    <PortfolioState>
      <DividendState>
        <Layout {...pageProps}>
          <DateState>
            <Component {...pageProps} />
          </DateState>
        </Layout>
      </DividendState>
    </PortfolioState>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (appContext) => {
  const { token } = parseCookies(appContext.ctx);

  let appProps = {};

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  appProps = await App.getInitialProps(appContext);

  if (token) {
    const isUnusableRoute =
      appContext.ctx.pathname === "/signin" ||
      appContext.ctx.pathname === "/signup" ||
      appContext.ctx.pathname === "/"

    if (isUnusableRoute) {
      redirectUser(appContext.ctx, "/explore");
    }
  }

  if (!token) {
    const isProtectedRoute =
      appContext.ctx.pathname === "/portfolio" ||
      appContext.ctx.pathname === "/portfolio/[ticker]" ||
      appContext.ctx.pathname === "/edit/dividends" ||
      appContext.ctx.pathname === "/edit/portfolio" ||
      appContext.ctx.pathname === "/edit/profile" ||
      appContext.ctx.pathname === "/dividends" ||
      appContext.ctx.pathname === "/dividends/monthly";

    if (isProtectedRoute) {
      redirectUser(appContext.ctx, "/signin");
    }
  } else {
    try {
      const payload = { headers: { Authorization: token } };
      const url = `${baseUrl}/account`;
      const response = await axios.get(url, payload);
      const user = response.data;
      appProps.pageProps.user = user;
    } catch (error) {
      console.error("Error getting current user", error);
      // Throw out invalid token
      destroyCookie(appContext.ctx, "token");
      // Redirect to login page
      redirectUser(appContext.ctx, "/signin");
    }
  }

  return { ...appProps };
};

export default MyApp;
