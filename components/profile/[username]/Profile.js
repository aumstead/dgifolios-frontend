import styles from "./Profile.module.scss";
import { useState, useEffect } from 'react'

function Profile({ profileUser }) {
  const {
    age,
    preference1,
    preference2,
    preference3,
    strategy,
    goals,
    username
  } = profileUser;

  const [showStrategicPrefs, setShowStrategicPrefs] = useState(true)

  const pref1 = handlePrefValue(preference1);
  const pref2 = handlePrefValue(preference2);
  const pref3 = handlePrefValue(preference3);

  // to handle formatting commas
  const prefsArray = [pref1, pref2, pref3];
  
  useEffect(() => {
    if (prefsArray[0] === '' && prefsArray[1] === '' && prefsArray[2] === '') {
      setShowStrategicPrefs(false)
    }
  }, [])

  function handlePrefValue(pref) {
    switch (pref) {
      case "dgi":
        pref = "dividend growth";
        break;
      case "stockPicking":
        pref = "stock picking";
        break;
      case "buyAndHold":
        pref = "buy and hold";
        break;
      case "etfs":
        pref = "ETFs";
        break;
      default:
        pref = ""
        break;
    }
    return pref;
  }

  return (
    <div className={styles.componentContainer}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <span className={styles.label}>User:</span>
          <span className={styles.value}>{username}</span>
        </div>

        {age && <div className={styles.formGroup}>
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>{age}</span>
        </div>}

        {showStrategicPrefs && <div className={styles.formGroup}>
          <span className={styles.label}>Strategic preferences:</span>
          <p className={`${styles.value} ${styles.capitalize} ${styles.p}`}>
            {prefsArray[1] === ''
              ? pref1 ||
                prefsArray[2] === '' ||
                `${pref1}, ${pref2}`
              : `${pref1}, ${pref2}, ${pref3}`}
          </p>
        </div>}

        {strategy && <div className={styles.formGroup}>
          <span className={styles.label}>
            Portfolio strategy:
          </span>
          <p className={`${styles.value} ${styles.p}`}>{strategy}</p>
        </div>}

        {goals && <div className={styles.formGroup}>
          <span className={styles.label}>
            Investment goals:
          </span>
          <p className={`${styles.value} ${styles.p}`}>{goals}</p>
        </div>}
      </div>
    </div>
  );
}

export default Profile;
