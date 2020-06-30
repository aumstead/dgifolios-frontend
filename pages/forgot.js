import styles from "./forgot.module.scss";
import { useState } from "react";
import catchErrors from "../utils/catchErrors";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

function forgot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/forgot`;

      const payload = { email };
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setEmail("");
    }
  }

  function handleChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Forgot password?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="email">
          Email address
        </label>
        <input
          onChange={handleChange}
          className={styles.input}
          type="email"
          name="email"
          value={email}
          disabled={loading}
        />
        {Boolean(error) && <span className={styles.invalidText}>{error}</span>}
        {success && (
          <span className={styles.successText}>
            Email sent to address containing a reset password link.
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
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
}

export default forgot;
