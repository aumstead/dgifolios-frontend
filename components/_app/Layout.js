import Head from 'next/head'
import Navbar from './Navbar'
import HeadContent from './HeadContent'
import styles from './Layout.module.scss'

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>dgi folios - Dividend investing, tracking, and sharing.</title>
      </Head>
      <Navbar user={user} />
      <div className={styles.layoutDiv}>
        {children}
      </div>
    </>
  )
}

export default Layout;