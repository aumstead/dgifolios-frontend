import styles from "./index.module.scss";
import { useState } from "react";
import catchErrors from "../../../utils/catchErrors";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import Link from "next/link";

function index({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validateConfirmPass, setValidateConfirmPass] = useState(true);
  const [passwordState, setPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    // validate confirm password
    if (passwordState.password !== passwordState.confirmPassword) {
      setValidateConfirmPass(false);
      setPasswordState((prevState) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
      return;
    }
    try {
      setLoading(true);
      const { password } = passwordState;
      setError("");
      const url = `${baseUrl}/reset`;
      const payload = { password, token };
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setPasswordState({
        password: "",
        confirmPassword: "",
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password" || name === "confirmPassword") {
      setValidateConfirmPass(true);
    }
    setPasswordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Reset Password</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="password">
          New password
        </label>
        <input
          onChange={handleChange}
          className={validateConfirmPass ? styles.input : styles.invalidInput}
          type="password"
          name="password"
          value={passwordState.password}
          disabled={loading}
        />
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm new password
        </label>
        <input
          onChange={handleChange}
          className={validateConfirmPass ? styles.input : styles.invalidInput}
          type="password"
          name="confirmPassword"
          value={passwordState.confirmPassword}
          disabled={loading}
        />
        {!validateConfirmPass && (
          <span className={styles.invalidText}>Passwords must match.</span>
        )}
        {Boolean(error) && <span className={styles.invalidText}>{error}</span>}
        {success && (
          <span className={styles.successText}>
            Success! Login{" "}
            <Link href="/signin">
              <a className={styles.guideLink}>here.</a>
            </Link>
          </span>
        )}
        <button
          className={
            loading ? `${styles.button} ${styles.disabledBtn}` : styles.button
          }
          type="submit"
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
            "Change password"
          )}
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.query;
  return {
    props: {
      token: token,
    },
  };
}

export default index;
