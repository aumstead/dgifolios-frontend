import SidebarMenu from "../../components/styled/SidebarMenu";
import PageHeading from "../../components/styled/PageHeading";
import EditPositionRow from "../../components/edit/portfolio/EditPositionRow";
import AddPositionRow from "../../components/edit/portfolio/AddPositionRow";
import ModalAlert from "../../components/styled/ModalAlert";
import { useState, useContext } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import styles from "./portfolio.module.scss";
import ZeroPositions from "../../components/edit/portfolio/ZeroPositions";
import cookie from "js-cookie";
import PortfolioContext from "../../contexts/portfolio/PortfolioContext";
import Footer from "../../components/styled/Footer";
import sort from 'fast-sort'
import { v4 as uuidv4 } from "uuid";

function portfolio({ user }) {
  const portfolioContext = useContext(PortfolioContext);
  const {
    portfolio,
    setPortfolio,
    showZeroPositions,
    setShowZeroPositions,
    makeCalculations,
  } = portfolioContext;

  const [addingNewTicker, setAddingNewTicker] = useState(false);
  const [editState, setEditState] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [activePosition, setActivePosition] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [directionByCostBasis, setDirectionByCostBasis] = useState(true)
  const [directionByShares, setDirectionByShares] = useState(true)
  const [directionByTicker, setDirectionByTicker] = useState(false)

  function addNewTicker() {
    setAddingNewTicker((prevState) => !prevState);
  }

  async function handleDelete({ mongoId }) {
    setDeleting(true);
    try {
      const url = `${baseUrl}/portfolio`;
      const token = cookie.get("token");
      const payload = {
        params: { mongoId },
        headers: { Authorization: token },
      };
      const response = await axios.delete(url, payload);
      const data = makeCalculations(response.data);
      setPortfolio(data);
    } catch (error) {
      console.error(error);
    }
    setShowAlert(false);
    setDeleting(false);
  }

  function handleClick() {
    if (!addingNewTicker) {
      addNewTicker();
    }
    setShowZeroPositions(false);
  }

  function sortByTicker() {
    setDirectionByTicker(!directionByTicker)
    if (directionByTicker) {
      sort(portfolio).desc(stock => stock.ticker)
    } else {
      sort(portfolio).asc(stock => stock.ticker)
    }
    setPortfolio([...portfolio])
  }

  function sortByShares() {
    setDirectionByShares(!directionByShares)
    if (directionByShares) {
      sort(portfolio).desc(stock => stock.shares)
    } else {
      sort(portfolio).asc(stock => stock.shares)
    }
    setPortfolio([...portfolio])
  }

  function sortByCostBasis() {
    setDirectionByCostBasis(!directionByCostBasis)
    if (directionByCostBasis) {
      sort(portfolio).desc(stock => stock.costBasis)
    } else {
      sort(portfolio).asc(stock => stock.costBasis)
    }
    setPortfolio([...portfolio])
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="Edit Portfolio" />
      <div className={styles.contentContainer}>
        {/* div to prevent flex space between from footer */}
        <div>
          <menu className={styles.secondaryMenu}>
            <button onClick={handleClick} className={styles.btnSecondaryMenu}>
              &#43;&nbsp;New Ticker
            </button>
          </menu>
          <div className={styles.tableHeadings}>
            <h6 onClick={sortByTicker} className={styles.tableHeading}>Ticker</h6>
            <h6 onClick={sortByShares} className={styles.tableHeading}>Shares</h6>
            <h6 onClick={sortByCostBasis} className={styles.tableHeading}>Avg Cost / Share</h6>
          </div>

          {/* if adding new ticker display input row */}
          {addingNewTicker && (
            <AddPositionRow
              setAddingNewTicker={setAddingNewTicker}
              setAddingNewTicker={setAddingNewTicker}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              makeCalculations={makeCalculations}
            />
          )}

          <div>
            {/* map over portfolio if there are positions in portfolio array */}
            {showZeroPositions ? (
              <ZeroPositions
                setShowZeroPositions={setShowZeroPositions}
                setAddingNewTicker={setAddingNewTicker}
                key={uuidv4()}
              />
            ) : (
              portfolio.map((position) => (
                <EditPositionRow
                  mongoId={position._id}
                  ticker={position.ticker}
                  shares={position.shares}
                  costBasis={position.costBasis}
                  addingNewTicker={addingNewTicker}
                  editState={editState}
                  setEditState={setEditState}
                  setShowAlert={setShowAlert}
                  setActivePosition={setActivePosition}
                  setPortfolio={setPortfolio}
                  makeCalculations={makeCalculations}
                  // key={uuidv4()}
                />
              ))
            )}

            {/* Are you sure you want to delete modal */}
            {showAlert && (
              <ModalAlert
                backdropOnClick={setShowAlert}
                heading={"Delete Ticker"}
                text={`Are you sure you want to remove ${activePosition.ticker}?`}
                loading={deleting}
              >
                <button
                  className={`${styles.buttonModalDelete}`}
                  onClick={() => handleDelete(activePosition)}
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
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default portfolio;
