import styles from './LoadingEllipsis.module.scss'

function LoadingEllipsis({ size }) {
  return (
    <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
  )
}

export default LoadingEllipsis;