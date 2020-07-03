import Head from "next/head";
import Navbar from "./Navbar";
import HeadContent from "./HeadContent";
import styles from "./Layout.module.scss";

function Layout({ children, user }) {
  return (
    <>
      <Head>
      <script
          dangerouslySetInnerHTML={{
            __html: `
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171572949-1"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-171572949-1');
            </script>            
              `,
          }}
        />
        <HeadContent />
        <title>dgi folios - Dividend investing, tracking, and sharing.</title>
      </Head>
      <Navbar user={user} />
      <div className={styles.layoutDiv}>{children}</div>
    </>
  );
}

export default Layout;
