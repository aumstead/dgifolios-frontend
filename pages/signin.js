import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from '../components/styled/LoadingSpinner'
import catchErrors from '../utils/catchErrors'
import axios from "axios";
import { handleLogin } from '../utils/auth'
import styles from "./signin.module.scss";
import baseUrl from '../utils/baseUrl'

const INITIAL_USER = {
  email: "",
  password: "",
};

function signin() {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true)
      setError('')
      const url = `${baseUrl}/signin`

      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Login for existing users.
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
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
          className={styles.input}
          type="password"
          name="password"
          value={user.password}
          disabled={loading}
        />
        <button className={styles.button} type="submit" disabled={loading}>
        {loading ? (
            <div className={styles.ldsEllipsis}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Login"
          )}
        </button>
        <div className={styles.guideContainer}>
          <span>Need an account?&nbsp;</span>
          <Link href='/signup'><a className={styles.guideLink}>Sign up!</a></Link>
        </div>
      </form>
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default signin;