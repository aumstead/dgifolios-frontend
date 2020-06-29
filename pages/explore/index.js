import styles from "./index.module.scss";
import PageHeading from "../../components/styled/PageHeading";
import SidebarMenu from "../../components/styled/SidebarMenu";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/styled/Footer";
import ProfileCard from "../../components/explore/ProfileCard";

function index({ user }) {
  const [activeFollowing, setActiveFollowing] = useState(true);
  const [activeFollowers, setActiveFollowers] = useState(false);
  const [activeRandom, setActiveRandom] = useState(false);
  const [followingState, setFollowingState] = useState([]);
  const [followersState, setFollowersState] = useState([]);

  useEffect(() => {
    if (user) {
      const { following, followers } = user;
      setFollowingState(following);
      setFollowersState(followers);
    }
  }, []);

  function handleFollowing() {
    setActiveFollowing(true);
    setActiveFollowers(false);
    setActiveRandom(false);
  }
  function handleFollowers() {
    setActiveFollowers(true);
    setActiveRandom(false);
    setActiveFollowing(false);
  }
  function handleRandom() {
    setActiveRandom(true);
    setActiveFollowing(false);
    setActiveFollowers(false);
  }
  return (
    <SidebarMenu user={user}>
      <PageHeading text="Explore" />
      <div className={styles.contentContainer}>
        <div className={styles.displayContainer}>
          <menu className={styles.menu}>
            <button
              onClick={handleFollowing}
              className={
                activeFollowing
                  ? `${styles.portfoliosBtn} ${styles.activeBtn}`
                  : `${styles.portfoliosBtn}`
              }
            >
              Portfolios following
            </button>
            <button
              onClick={handleFollowers}
              className={
                activeFollowers
                  ? `${styles.followersBtn} ${styles.activeBtn}`
                  : `${styles.followersBtn}`
              }
            >
              My followers
            </button>
            <button
              onClick={handleRandom}
              className={
                activeRandom
                  ? `${styles.randomBtn} ${styles.activeBtn}`
                  : `${styles.randomBtn}`
              }
            >
              Random portfolios
            </button>
            <hr className={styles.hr} />
          </menu>
          {activeFollowing && (
            <div>
              <ul className={styles.ul}>
                {followingState.length === 0 && (
                  <div>
                    <p className={styles.zeroFollowers}>
                      You aren't following any portfolios yet!
                    </p>
                    <button onClick={handleRandom} className={styles.zeroBtn}>
                      View random portfolios&nbsp;&#8594;
                    </button>
                  </div>
                )}
                {followingState.map((user) => (
                  <ProfileCard user={user} />
                ))}
              </ul>
            </div>
          )}

          {activeFollowers && (
            <div>
              <ul className={styles.ul}>
                {followersState.length === 0 && (
                  <p className={styles.zeroFollowers}>
                    Your portfolio doesn't have any followers yet!
                  </p>
                )}
                {followersState.map((user) => (
                  <ProfileCard user={user} />
                ))}
              </ul>
            </div>
          )}

          {activeRandom && <div>random</div>}
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default index;
