import Head from 'next/head'
import Navbar from './Navbar'
import HeadContent from './HeadContent'

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>Dividend Tracker</title>
      </Head>
      <Navbar user={user} />
      <div>
        {children}
      </div>
    </>
  )
}

export default Layout;