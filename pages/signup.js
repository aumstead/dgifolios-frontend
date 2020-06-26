import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../components/styled/LoadingSpinner";
import catchErrors from "../utils/catchErrors";
import axios from "axios";
import { handleLogin } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import styles from "./signup.module.scss";

const INITIAL_USER = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validateConfirmPass, setValidateConfirmPass] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    // validate confirm password
    if (user.password !== user.confirmPassword) {
      setValidateConfirmPass(false);
      setUser((prevState) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
      return;
    }
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    if (name === "password" || name === "confirmPassword") {
      setValidateConfirmPass(true);
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Create an account.
        <br />
        Access everything for free.
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          onChange={handleChange}
          className={styles.input}
          name="username"
          type="text"
          value={user.username}
          disabled={loading}
        />
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          onChange={handleChange}
          className={styles.input}
          type="email"
          name="email"
          value={user.email}
          disabled={loading}
        />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          onChange={handleChange}
          className={validateConfirmPass ? styles.input : styles.invalidInput}
          type="password"
          name="password"
          value={user.password}
          disabled={loading}
        />
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          onChange={handleChange}
          className={validateConfirmPass ? styles.input : styles.invalidInput}
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          disabled={loading}
        />
        {!validateConfirmPass && (
          <span className={styles.invalidText}>Passwords must match.</span>
        )}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? (
            <div className={styles.ldsEllipsis}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Sign up"
          )}
        </button>
        <div className={styles.guideContainer}>
          <span>Already registered?&nbsp;</span>
          <Link href="/signin">
            <a className={styles.guideLink}>Login!</a>
          </Link>
        </div>
      </form>
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default signup;
