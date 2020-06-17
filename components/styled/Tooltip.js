import styles from './Tooltip.module.scss'

function Tooltip({ text, style }) {
  return (
    <span className={styles.tooltip} style={style}>
      {text}
    </span>
  )
}

export default Tooltip;