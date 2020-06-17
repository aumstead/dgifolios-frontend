import LoadingSpinner from "../components/styled/LoadingSpinner";
import styles from "./index.module.scss";
import axios from 'axios'

export default function Home(props) {
  
  async function handleClick() {
    console.log('handle')
    const url = 'https://i7mj847ndi.execute-api.us-east-1.amazonaws.com/dev/compare-yourself'
    const response = await axios.post(url)
    console.log(response)
  }
  return (
    <>
      <p>Home</p>
      <button onClick={handleClick} className={styles.testBtn}>Test api</button>
      <LoadingSpinner size="mini" />
    </>
  );
}
