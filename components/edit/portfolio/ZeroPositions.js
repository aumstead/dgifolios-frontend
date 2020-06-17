import styles from "./ZeroPositions.module.scss";
import DummyRow from "./DummyRow";

function ZeroPositions({ setShowZeroPositions, setAddingNewTicker }) {
  function handleClick() {
    setShowZeroPositions(false)
    setAddingNewTicker(true)
  }
  
  return (
    <div className={styles.container}>
      <DummyRow ticker="AAPL" shares={10} costBasis={211.79} />
      <DummyRow ticker="JNJ" shares={27} costBasis={97.33} />
      <DummyRow ticker="MO" shares={50} costBasis={57.83} />
      <DummyRow ticker="MSFT" shares={15} costBasis={80.5} />
      <DummyRow ticker="O" shares={120} costBasis={45.96} />
      <DummyRow ticker="T" shares={200} costBasis={31} />
      <div className={styles.ctaContainer}>
        <h3 className={styles.h3}>Add positions to your portfolio!</h3>
        <button
          onClick={handleClick}
          className={styles.ctaBtn}
        >
          &#43;&nbsp;New Ticker
        </button>
      </div>
    </div>
  );
}

export default ZeroPositions;
