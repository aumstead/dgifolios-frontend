import styles from './UpcomingExDivMobileRow.module.scss'
import Link from 'next/link'

function UpcomingExDivMobileRow({ ticker, prevExDivDate, estimatedExDivDate }) {
  return (
    <div className={styles.row}>
      <Link
        href={`/portfolio/[ticker]?ticker=${ticker}`}
        as={`/portfolio/${ticker}`}
      >
        <span className={styles.ticker}>{ticker}</span>
      </Link>
      <span>{prevExDivDate}</span>
      <span>{estimatedExDivDate}</span>
    </div>
  )
}

export default UpcomingExDivMobileRow;