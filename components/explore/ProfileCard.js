import styles from "./ProfileCard.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";

function ProfileCard({ user }) {
  const {
    username,
    age,
    goals,
    preference1,
    preference2,
    preference3,
    strategy,
  } = user;

  const [showStrategicPrefs, setShowStrategicPrefs] = useState(true);

  const pref1 = handlePrefValue(preference1);
  const pref2 = handlePrefValue(preference2);
  const pref3 = handlePrefValue(preference3);

  // to handle formatting commas
  const prefsArray = [pref1, pref2, pref3];

  useEffect(() => {
    if (prefsArray[0] === "" && prefsArray[1] === "" && prefsArray[2] === "") {
      setShowStrategicPrefs(false);
    }
  }, []);

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
      case "options":
        pref = "options";
        break;
      case "indexing":
        pref = "indexing";
        break;
      default:
        pref = "";
        break;
    }
    return pref;
  }

  return (
    <li className={styles.card}>
      <Link href={`/profile/${user.username}`}>
        <div className={styles.cardFiller}>
          <div className={styles.formGroup}>
            <span className={styles.label}>User:</span>
            <span className={styles.value}>{user.username}</span>
          </div>

          {age ? (
            <div className={styles.formGroup}>
              <span className={styles.label}>Age:</span>
              <span className={styles.value}>{age}</span>
            </div>
          ) : (
            <div className={styles.formGroup}>
              <span className={styles.label}>Age:</span>
              <span className={styles.value}>n/a</span>
            </div>
          )}

          {showStrategicPrefs && (
            <div className={styles.formGroup}>
              <span className={styles.label}>Strategic preferences:</span>
              <span className={`${styles.value} ${styles.capitalize} ${styles.p}`}>
                {prefsArray[1] === ""
                  ? pref1
                  : prefsArray[2] === ""
                  ? `${pref1}, ${pref2}`
                  : `${pref1}, ${pref2}, ${pref3}`}
              </span>
            </div>
          )}

          {strategy && (
            <div className={styles.formGroup}>
              <span className={styles.label}>Portfolio strategy:</span>
              <span className={`${styles.value} ${styles.p}`}>{strategy}</span>
            </div>
          )}

  
        </div>
      </Link>
    </li>
  );
}

export default ProfileCard;
