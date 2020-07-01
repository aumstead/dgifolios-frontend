import SidebarMenu from "../../components/styled/SidebarMenu";
import styles from "./dividends.module.scss";
import PageHeading from "../../components/styled/PageHeading";
import DividendHistoryTable from "../../components/edit/dividends/DividendHistoryTable";
import { useState, useContext } from "react";
import DividendContext from "../../contexts/dividends/DividendContext";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import ModalAlert from "../../components/styled/ModalAlert";
import cookie from "js-cookie";
import Footer from "../../components/styled/Footer";

function dividends({ user }) {
  // Context
  const dividendContext = useContext(DividendContext);
  const {
    dividends,
    setDividends,
    makeCalculations,
    calculateAllTimeDividends,
    showZeroDividends,
    setShowZeroDividends,
  } = dividendContext;

  // States
  const [addingNewDividend, setAddingNewDividend] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeDividend, setActiveDividend] = useState({});

  async function handleDelete({ mongoId }) {
    setDeleting(true);
    try {
      const url = `${baseUrl}/dividends`;
      const token = cookie.get("token");
      const payload = {
        params: { mongoId },
        headers: { Authorization: token },
      };

      const response = await axios.delete(url, payload);
      const data = makeCalculations(response.data);
      calculateAllTimeDividends(response.data);
      setDividends(data);
    } catch (error) {
      console.error(error);
    }
    setShowAlert(false);
    setDeleting(false);
  }

  function handleClick() {
    if (!addingNewDividend) {
      setAddingNewDividend(true);
    }
    setShowZeroDividends(false);
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="Edit Dividends" />
      <div className={styles.contentContainer}>
        {/* div to prevent flex space between from footer */}
        <div>
          <menu className={styles.secondaryMenu}>
            <button onClick={handleClick} className={styles.btnSecondaryMenu}>
              &#43;&nbsp;New Dividend
            </button>
          </menu>
          <DividendHistoryTable
            setAddingNewDividend={setAddingNewDividend}
            addingNewDividend={addingNewDividend}
            dividends={dividends}
            setDividends={setDividends}
            setShowAlert={setShowAlert}
            setActiveDividend={setActiveDividend}
            showZeroDividends={showZeroDividends}
            setShowZeroDividends={setShowZeroDividends}
          />

          {/* Are you sure you want to delete modal */}
          {showAlert && (
            <ModalAlert
              backdropOnClick={setShowAlert}
              heading={"Delete Ticker"}
              text={`Are you sure you want to remove this ${activeDividend.ticker} dividend?`}
              loading={deleting}
            >
              <button
                className={`${styles.buttonModalDelete}`}
                onClick={() => handleDelete(activeDividend)}
                disabled={deleting}
              >
                Delete
              </button>
              <button
                className={`${styles.buttonModalCancel}`}
                onClick={() => setShowAlert(false)}
                disabled={deleting}
              >
                Cancel
              </button>
            </ModalAlert>
          )}
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default dividends;
