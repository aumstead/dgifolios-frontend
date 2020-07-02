import styles from "./index.module.scss";
import PageHeading from "../../components/styled/PageHeading";
import SidebarMenu from "../../components/styled/SidebarMenu";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/styled/Footer";
import ProfileCard from "../../components/explore/ProfileCard";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import LoadingSpinner from "../../components/styled/LoadingSpinner";

function index({ user }) {
  const [showComponent, setShowComponent] = useState(false);
  const [activeFollowing, setActiveFollowing] = useState(false);
  const [activeFollowers, setActiveFollowers] = useState(false);
  const [activeRandom, setActiveRandom] = useState(true);
  const [followingState, setFollowingState] = useState([]);
  const [followersState, setFollowersState] = useState([]);
  const [randomProfilesState, setRandomProfilesState] = useState([]);

  useEffect(() => {
    // get data
    async function getData() {
      const url = `${baseUrl}/randomProfiles`;
      const response = await axios.get(url);
      setRandomProfilesState(response.data);

      setShowComponent(true);
    }

    getData();
  }, []);

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

  if (!showComponent) {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <LoadingSpinner size="big" />
      </div>
    );
  }

  if (!user) {
    return (
      <SidebarMenu user={user}>
        <PageHeading text="Explore" />
        <div className={styles.contentContainer}>
          <div className={styles.displayContainer}>
            <menu className={styles.menu}>
              <button
                onClick={handleRandom}
                className={
                  activeRandom
                    ? `${styles.randomBtn} ${styles.activeBtn}`
                    : `${styles.randomBtn}`
                }
              >
                Community portfolios
              </button>
              <button
                onClick={handleFollowing}
                className={
                  activeFollowing
                    ? `${styles.portfoliosBtn} ${styles.activeBtn}`
                    : `${styles.portfoliosBtn}`
                }
              >
                Profiles Following
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

              <hr className={styles.hr} />
            </menu>
            {activeFollowing && (
              <div>
                <div className={styles.notLoggedIn}>
                  <p>
                    Please{" "}
                    <Link href="/signin">
                      <a className={styles.notLoggedIn__link}>sign in</a>
                    </Link>{" "}
                    or{" "}
                    <Link href="/signup">
                      <a className={styles.notLoggedIn__link}>create an account</a>
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {activeFollowers && (
              <div className={styles.notLoggedIn}>
                <p>
                  Please{" "}
                  <Link href="/signin">
                    <a className={styles.notLoggedIn__link}>sign in</a>
                  </Link>{" "}
                  or{" "}
                  <Link href="/signup">
                    <a className={styles.notLoggedIn__link}>create an account</a>
                  </Link>
                  .
                </p>
              </div>
            )}

            {activeRandom && (
              <div>
                <ul className={styles.ul}>
                  {randomProfilesState.map((user) => (
                    <ProfileCard user={user} key={user._id} />
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu user={user}>
      <PageHeading text="Explore" />
      <div className={styles.contentContainer}>
        <div className={styles.displayContainer}>
          <menu className={styles.menu}>
            <button
              onClick={handleRandom}
              className={
                activeRandom
                  ? `${styles.randomBtn} ${styles.activeBtn}`
                  : `${styles.randomBtn}`
              }
            >
              Community portfolios
            </button>
            <button
              onClick={handleFollowing}
              className={
                activeFollowing
                  ? `${styles.portfoliosBtn} ${styles.activeBtn}`
                  : `${styles.portfoliosBtn}`
              }
            >
              Profiles Following
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
                    {/* <button onClick={handleRandom} className={styles.zeroBtn}>
                      View random portfolios&nbsp;&#8594;
                    </button> */}
                  </div>
                )}
                {followingState.map((user) => (
                  <ProfileCard user={user} key={user._id} />
                ))}
              </ul>
            </div>
          )}

          {activeFollowers && (
            <div>
              <ul className={styles.ul}>
                {followersState.length === 0 && (
                  <div>
                    <p className={styles.zeroFollowers}>
                      Your portfolio doesn't have any followers yet.
                    </p>
                    <Link href="/edit/profile">
                      <a className={styles.cta__editProfile}>
                        Add details to your profile!
                      </a>
                    </Link>
                  </div>
                )}
                {followersState.map((user) => (
                  <div className={styles.followers__div}>
                    <Link href={`/profile/${user.username}`}>
                      <a className={styles.followers__link}>{user.username}</a>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {activeRandom && (
            <div>
              <ul className={styles.ul}>
                {randomProfilesState.map((user) => (
                  <ProfileCard user={user} key={user._id} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export default index;
