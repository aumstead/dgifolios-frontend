import styles from './Backdrop.module.scss'

function Backdrop({ children, onClick, loading, styleObj }) {
  function handleClick() {
    if (loading) {
      return
    } else {
      onClick(false)
    }
  }
  return (
    <div onClick={handleClick} className={styles.backdrop} style={styleObj}>
      {children}
    </div>
  )
}

export default Backdrop;