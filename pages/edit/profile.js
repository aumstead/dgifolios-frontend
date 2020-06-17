import styles from "./profile.module.scss";
import { useState } from "react";
import SidebarMenu from "../../components/styled/SidebarMenu";
import PageHeading from "../../components/styled/PageHeading";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import axios from "axios";
import LoadingSpinner from "../../components/styled/LoadingSpinner";
import Footer from '../../components/styled/Footer'

function profile({ user }) {
  // States
  const [values, setValues] = useState({
    age: user.age,
    preference1: user.preference1,
    preference2: user.preference2,
    preference3: user.preference3,
    strategy: user.strategy,
    goals: user.goals,
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    show: false,
    status: "",
    message: "",
  });

  const {
    age,
    preference1,
    preference2,
    preference3,
    strategy,
    goals,
  } = values;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const url = `${baseUrl}/users`;
      const payload = {
        ...values,
      };
      const response = await axios.patch(url, payload, headers);
      setShowMessage((prevState) => {
        let status = true;
        if (response.status !== 200) {
          status = false;
        }
        return {
          show: true,
          status,
          message: response.data,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setValues({
        age: "",
        preference1: "",
        preference2: "",
        preference3: "",
        strategy: "",
        goals: "",
      });
      setLoading(false);
      setTimeout(() => {
        setShowMessage({
          show: false,
          status: "",
          message: "",
        });
      }, 5000);
    }
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="Edit Profile" />
      <div className={styles.componentContainer}>
        <form className={styles.form}>
          {/* <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="user">
              User:
            </label>
            <input
              onChange={handleChange}
              value={user}
              className={styles.input}
              name="user"
              type="text"
              autoFocus
            />
          </div> */}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="age">
              Age:
            </label>
            <input
              onChange={handleChange}
              value={age}
              className={`${styles.input} ${styles.inputAge}`}
              name="age"
              type="number"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="preference1">
              Investing preferences:
            </label>
          </div>

          <div className={styles.formGroup}>
            <select
              onChange={handleChange}
              value={preference1}
              className={styles.select}
              name="preference1"
              disabled={loading}
            >
              <option value="">None</option>
              <option value="dgi">Dividend growth</option>
              <option value="buyAndHold">Buy and hold</option>
              <option value="indexing">Indexing</option>
              <option value="etfs">ETFs</option>
              <option value="stockPicking">Stock picking</option>
              <option value="options">Options</option>
            </select>

            <select
              onChange={handleChange}
              value={preference2}
              className={styles.select}
              name="preference2"
              disabled={loading}
            >
              <option value="">None</option>
              <option value="dgi">Dividend growth</option>
              <option value="buyAndHold">Buy and hold</option>
              <option value="indexing">Indexing</option>
              <option value="etfs">ETFs</option>
              <option value="stockPicking">Stock picking</option>
              <option value="options">Options</option>
            </select>

            <select
              onChange={handleChange}
              value={preference3}
              className={styles.select}
              name="preference3"
              disabled={loading}
            >
              <option value="">None</option>
              <option value="dgi">Dividend growth</option>
              <option value="buyAndHold">Buy and hold</option>
              <option value="indexing">Indexing</option>
              <option value="etfs">ETFs</option>
              <option value="stockPicking">Stock picking</option>
              <option value="options">Options</option>
            </select>
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupTextbox}`}>
            <label className={styles.label} htmlFor="strategy">
              Portfolio strategy: (140 characters)
            </label>
            <textarea
              onChange={handleChange}
              value={strategy}
              className={styles.textarea}
              placeholder="Offer some insight into what you try to do within your portfolio..."
              name="strategy"
              cols="60"
              rows="5"
              maxLength="140"
              disabled={loading}
            ></textarea>
          </div>

          <div className={`${styles.formGroup} ${styles.formGroupTextbox}`}>
            <label className={styles.label} htmlFor="goals">
              Investment goals: (140 characters)
            </label>
            <textarea
              onChange={handleChange}
              value={goals}
              className={styles.textarea}
              placeholder="Say something about your investment goals..."
              name="goals"
              cols="60"
              rows="5"
              maxLength="140"
              disabled={loading}
            ></textarea>
          </div>

          <div className={styles.btnFlexContainer}>
            <button
              onClick={handleSubmit}
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.ldsEllipsis}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
            {showMessage.show && (
              <span
                className={
                  showMessage.status
                    ? `${styles.messageGreen}`
                    : `${styles.messageRed}`
                }
              >
                {showMessage.message}
              </span>
            )}
        </form>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default profile;
