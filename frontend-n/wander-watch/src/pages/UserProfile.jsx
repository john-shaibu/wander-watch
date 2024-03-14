import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import TimeDropdown from "../components/TimeDropDown";
import HistoryDurationDropdown from "../components/HistoryDurationDropdown";
import PageHelmet from "../components/Helmet";
import ToggleThemes from "../components/ToggleThemes";
import ToggleNotifications from "../components/ToggleNotifications";
import "../styles/dashboard.css";
import "../styles/profile.css";
import { useToggle } from "../hooks/useToggle";

const UserProfile = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState


  return (
    <div className="main-container">
      <PageHelmet
        title="Dashboard"
        keywords="location tracker, wander watch, location monitor"
        description="Wander watch Dashboard page"
      />
      <Header headerName="Metrics" />
      <Sidenav toggleState={toggleState} />
      <div className={`side-nav-underlay${open ? " open" : ""}`}></div>
      <div className="profile-wrapper">
          <main>
            <div className="profile-container">
              yugwfueywuyr
            </div>
          </main>
      </div>
    </div>
  )
}

export default UserProfile