import styles from "./index.module.scss";
import SidebarMenu from "../../../components/styled/SidebarMenu";
import PageHeading from "../../../components/styled/PageHeading";
import { useEffect, useState, useContext } from "react";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import SectionHeading from "../../../components/styled/SectionHeading";
import Statistics from "../../../components/profile/[username]/Statistics";
import Profile from "../../../components/profile/[username]/Profile";
import PortfolioPreview from "../../../components/profile/[username]/PortfolioPreview";
import DividendsPreview from "../../../components/profile/[username]/DividendsPreview";
import ModalPie from "../../../components/profile/[username]/ModalPie";
import ModalPortfolio from "../../../components/profile/[username]/ModalPortfolio";
import ModalDividends from "../../../components/profile/[username]/ModalDividends";
import cookie from "js-cookie";
import Link from "next/link";
import sort from "fast-sort";
import Footer from "../../../components/styled/Footer";
import DividendContext from "../../../contexts/dividends/DividendContext";
import PortfolioContext from "../../../contexts/portfolio/PortfolioContext";
import LoadingSpinner from "../../../components/styled/LoadingSpinner";

function index({ username, ctx, user }) {
  // Contexts
  const dividendContext = useContext(DividendContext);
  const portfolioContext = useContext(PortfolioContext);
  const { dividends } = dividendContext;
  const { portfolio } = portfolioContext;

  // States
  const [showComponent, setShowComponent] = useState(false);
  const [profilePortfolio, setProfilePortfolio] = useState([]);
  const [profileDividends, setProfileDividends] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [allTimeRankings, setAllTimeRankings] = useState([]);
  // a state used if user has not yet entered any portfolio data
  const [showZeroPositions, setShowZeroPositions] = useState(false);
  const [totalInvestedCapital, setTotalInvestedCapital] = useState();
  const [years, setYears] = useState([]);
  // modals
  const [showModalPie, setShowModalPie] = useState(false);
  const [showModalPortfolio, setShowModalPortfolio] = useState(false);
  const [showModalDividends, setShowModalDividends] = useState(false);
  // loading for follow button
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  // Variable (needs to be outside of loop)
  const yearsArray = [];

  useEffect(() => {
    // get data
    async function getData() {
      // get user _id
      // the profile user, not current site user.
      const profileUser = await getUserInfo(ctx);
      setProfileUser(profileUser);
      const { _id } = profileUser;
      const divUrl = `${baseUrl}/profileDividends`;
      const divPromise = axios.get(divUrl, {
        params: {
          mongoId: {
            _id,
          },
        },
      });

      const portfolioUrl = `${baseUrl}/profilePortfolio`;
      const portfolioPromise = axios.get(portfolioUrl, {
        params: {
          mongoId: {
            _id,
          },
        },
      });

      await Promise.all([divPromise, portfolioPromise])
        .then((values) => {
          const dividendsData = dividendCalculations(values[0].data);
          setProfileDividends(dividendsData);
          const portfolioData = portfolioCalculations(values[1].data);
          setProfilePortfolio(portfolioData);
          setShowComponent(true);
        })
        .catch((error) => console.error(error));
    }

    if (!user) getData();
    else if (username === user.username) {
      setProfileUser(user);
      setShowComponent(true);
      return;
    } else {
      getData();
    }

    // if there is a user, is current user following the profile user?
    if (user) {
      const isFollowing = user.following.find(
        (user) => user.username === username
      );
      if (isFollowing) {
        setFollowing(true);
      }
    }
  }, []);

  useEffect(() => {
    if (user && username === user.username) {
      const dividendsData = dividendCalculations(dividends);
      setProfileDividends(dividendsData);
      const portfolioData = portfolioCalculations(portfolio);
      setProfilePortfolio(portfolioData);
    }
  }, [dividends, portfolio]);

  async function getUserInfo() {
    try {
      const url = `${baseUrl}/users`;
      const response = await axios.get(url, {
        params: {
          username,
        },
      });

      return response.data;
    } catch (error) {
      console.error("error getting user Id");
    }
  }

  function dividendCalculations(data) {
    data.forEach((div) => {
      const { divDate, amount, shares, exDivDate } = div;

      // Handle divDate DOMstring to date object
      const divDateString = divDate.toString();
      const divDateObj = new Date(divDateString);
      div.month = divDateObj.getMonth();
      div.year = divDateObj.getFullYear();
      div.day = divDateObj.getDate();

      // Handle exDivDate DOMstring to date object
      const exDivDateString = exDivDate.toString();
      const exDivDateObj = new Date(exDivDateString);
      div.exDivMonth = exDivDateObj.getMonth();
      div.exDivDay = exDivDateObj.getDate();
      div.exDivYear = exDivDateObj.getFullYear();

      // Multiply amount by shares and create total property
      div.total = Number((amount * shares).toFixed(2));

      // Add netCostBasis property
      if (div.costBasis > 0) {
        div.netCostBasis = Number((div.costBasis * div.shares).toFixed(2));
      }

      // Calculate yield on cost and add property
      if (div.frequency === "quarterly" && div.costBasis) {
        div.yield = Number(
          (((div.amount * 4) / div.costBasis) * 100).toFixed(2)
        );
      }

      // If yearsArray doesn't have the newly created year property, push the string to yearsArray
      if (!yearsArray.includes(div.year)) {
        yearsArray.push(div.year);
      }

      // Set states
      const sortedYears = sort(yearsArray).asc();
      setYears(sortedYears);
    });
    return data;
  }

  function portfolioCalculations(data) {
    let totalPortfolioInvestedCapital = 0;
    data.forEach((position) => {
      position.investedCapital = Number(
        (position.costBasis * position.shares).toFixed(2)
      );
      totalPortfolioInvestedCapital += position.investedCapital;
    });

    setTotalInvestedCapital(totalPortfolioInvestedCapital);

    // Second loop with totalPortfolioInvestedCapital value
    data.forEach((position) => {
      position.percentOfPortfolio = (
        (position.investedCapital / totalPortfolioInvestedCapital) *
        100
      ).toFixed(1);
    });
    return data;
  }

  async function handleFollow() {
    try {
      setLoading(true);
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      const urlUsers = `${baseUrl}/users/follow`;
      const urlFollowers = `${baseUrl}/followers`;
      const payloadUsers = {
        user: profileUser,
      };
      const payloadFollowers = {
        profileUser: profileUser,
        user: user,
      };

      const followPromise = await axios.patch(urlUsers, payloadUsers, headers);
      const followersPromise = await axios.patch(
        urlFollowers,
        payloadFollowers,
        headers
      );

      await Promise.all([followPromise, followersPromise])
        .then((values) => {})
        .catch((error) => console.error(error));

      // all following actions completed
      setFollowing(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUnfollow(username) {
    setLoading(true);
    try {
      const urlUsers = `${baseUrl}/users/unfollow`;
      const urlFollowers = `${baseUrl}/followers`;
      const token = cookie.get("token");
      const { _id } = profileUser;
      const { username } = user;
      // _id is used to find the document, username is what is deleted from array of followers
      const payloadFollowers = {
        params: { _id, username },
        headers: { Authorization: token },
      };
      const payloadUsers = {
        params: { username: profileUser.username },
        headers: { Authorization: token },
      };
      const promiseUsers = await axios.delete(urlUsers, payloadUsers);
      const promiseFollowers = await axios.delete(
        urlFollowers,
        payloadFollowers
      );

      await Promise.all([promiseUsers, promiseFollowers])
        .then((values) => {})
        .catch((error) => console.error(error));

      // unfollow was successful, set state to false
      setFollowing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!showComponent) {
    return (
      <div className={styles.loadingSpinnerContainer}>
        <LoadingSpinner size="big" />
      </div>
    );
  }

  return (
    <SidebarMenu user={user}>
      <div className={styles.contentContainer}>
        <PageHeading text={`${username}'s portfolio`} />

        {!user ? (
          <div></div>
        ) : username === user.username ? (
          <div></div>
        ) : following ? (
          <button
            onClick={() => handleUnfollow(profileUser.username)}
            className={styles.btnFollowing}
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
              <>
                <span className={styles.span}>Following</span>
                <span className={styles.spanHover}>Unfollow</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className={styles.btnFollow}
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
              <span>Follow&nbsp;&#43;</span>
            )}
          </button>
        )}
        {!user || profileUser.username === user.username ? (
          <SectionHeading text="Profile" />
        ) : (
          <SectionHeading stylesObj={{ marginTop: "0rem" }} text="Profile" />
        )}

        <Profile profileUser={profileUser} />

        <SectionHeading text="Statistics" />

        {profileDividends.length !== 0 && profilePortfolio.length !== 0 ? (
          <Statistics
            portfolio={profilePortfolio}
            dividends={profileDividends}
          />
        ) : !user ? (
          <p className={styles.zeroStats}>
            User must add positions and dividends to create statistics.
          </p>
        ) : user.username === profileUser.username ? (
          <p className={styles.zeroStats}>
            Add portfolio positions and dividends to generate statistics.
          </p>
        ) : (
          <div></div>
        )}

        <SectionHeading text="Portfolio" />

        {profilePortfolio.length !== 0 ? (
          <PortfolioPreview
            portfolio={profilePortfolio}
            user={profileUser}
            setShowModalPie={setShowModalPie}
            setShowModalPortfolio={setShowModalPortfolio}
          />
        ) : !user ? (
          <p className={styles.zeroStats}>User has not added any positions.</p>
        ) : user.username === profileUser.username ? (
          <Link href="/edit/portfolio">
            <a className={styles.zeroBtn}>Add positions</a>
          </Link>
        ) : (
          <p className={styles.zeroStats}>User has not added any positions.</p>
        )}

        <SectionHeading text="Dividends" />

        {profileDividends.length !== 0 ? (
          <DividendsPreview
            dividends={profileDividends}
            years={years}
            setShowModalDividends={setShowModalDividends}
          />
        ) : !user ? (
          <p className={styles.zeroStats}>User has not added any dividends.</p>
        ) : user.username === profileUser.username ? (
          <Link href="/edit/dividends">
            <a className={styles.zeroBtn}>Add dividends</a>
          </Link>
        ) : (
          <p className={styles.zeroStats}>User has not added any dividends.</p>
        )}

        {showModalPie && (
          <ModalPie
            portfolio={profilePortfolio}
            backdropOnClick={() => setShowModalPie(false)}
            username={username}
          />
        )}
        {showModalPortfolio && (
          <ModalPortfolio
            portfolio={profilePortfolio}
            backdropOnClick={() => setShowModalPortfolio(false)}
            username={username}
          />
        )}
        {showModalDividends && (
          <ModalDividends
            dividends={profileDividends}
            backdropOnClick={() => setShowModalDividends(false)}
            years={years}
          />
        )}
        <Footer />
      </div>
    </SidebarMenu>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  return {
    props: {
      username: username,
    },
  };
}

export default index;
