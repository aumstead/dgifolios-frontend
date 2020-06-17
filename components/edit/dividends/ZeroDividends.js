import styles from "./ZeroDividends.module.scss";
import DummyRow from "./DummyRow";

function ZeroDividends({ setShowZeroDividends, setAddingNewDividend }) {
  function handleClick() {
    setShowZeroDividends(false);
    setAddingNewDividend(true);
  }

  return (
    <div className={styles.container}>
      <DummyRow
        ticker="AAPL"
        shares={10}
        costBasis={211.79}
        exDivDate={"2020-05-08"}
        divDate={"2020-05-14"}
        amount={".82"}
        frequency={"Quarterly"}
      />
      <DummyRow
        ticker="JNJ"
        shares={27}
        costBasis={97.33}
        exDivDate={"2020-05-22"}
        divDate={"2020-06-09"}
        amount={"1.01"}
        frequency={"Quarterly"}
      />
      <DummyRow
        ticker="MO"
        shares={50}
        costBasis={57.83}
        exDivDate={"2020-06-12"}
        divDate={"2020-07-10"}
        amount={".84"}
        frequency={"Quarterly"}
      />
      <DummyRow
        ticker="MSFT"
        shares={15}
        costBasis={80.5}
        exDivDate={"2020-05-20"}
        divDate={"2020-06-11"}
        amount={".51"}
        frequency={"Quarterly"}
      />
      <DummyRow
        ticker="O"
        shares={120}
        costBasis={45.96}
        exDivDate={"2020-05-29"}
        divDate={"2020-06-15"}
        amount={".233"}
        frequency={"Monthly"}
      />
      <DummyRow
        ticker="T"
        shares={200}
        costBasis={31}
        exDivDate={"2020-04-08"}
        divDate={"2020-05-01"}
        amount={".52"}
        frequency={"Quarterly"}
      />
      <DummyRow
        ticker="SWKS"
        shares={22}
        costBasis={77.21}
        exDivDate={"2020-05-20"}
        divDate={"2020-06-11"}
        amount={".44"}
        frequency={"Quarterly"}
      />
      <div className={styles.ctaContainer}>
        <h3 className={styles.h3}>Add your dividends!</h3>
        <button onClick={handleClick} className={styles.ctaBtn}>
          &#43;&nbsp;New Dividend
        </button>
      </div>
    </div>
  );
}

export default ZeroDividends;
