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
import user_dp_image from '../assets/images/user_dp.jpg'
import { EditIcon } from "../assets";


const UserProfile = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState


  return (
    <div className="main-container">
      <PageHelmet
        title="Profile"
        keywords="location tracker, wander watch, location monitor"
        description="Wander watch Profile page"
      />
      <Header headerName="Profile" />
      <Sidenav toggleState={toggleState} />
      <div className={`side-nav-underlay${open ? " open" : ""}`}></div>
      <div className="profile-wrapper">
          <main>
            <div className="profile-container">
              <div className="user_dp flex items-center gap-10">
                <div className="user_profile_avatar w-[120px] h-[120px] bg-[#ddd] rounded-full">
                  <img src={user_dp_image} alt="user profile avatar" />
                </div>
                <div className="user_profile_avatar_actions flex items-center gap-6">
                  <button className="h-[48px] w-[120px] bg-[var(--bg-primary)] px-4 text-[var(--color-lightest)] rounded-lg text-sm font-semibold">Change</button>
                  <button className="h-[48px] w-[120px] bg-[var(--color-lightest)] px-4 text-[var(--bg-primary)] rounded-lg text-sm font-semibold border-2 border-[var(--bg-primary)]">View</button>
                </div>
              </div>
              <div className="user_general_information">
                <div className="user_general_information_header">
                  <h3 className="font-bold text-2xl text-[var(--color-darkest)]">General Information</h3>
                  <button className="edit_genaral_information"> <span><EditIcon /></span> Edit</button>
                </div>
                <form  className="user_general_information_fields">
                  <div>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" value={'John'} placeholder="firstname" readOnly />
                  </div>
                  <div>
                    <label htmlFor="lastname">lastname</label>
                    <input type="text" value={'Shaibu'} placeholder="lastname" readOnly />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={'Johnmxawell059@gmail.com'} placeholder="Email" readOnly />
                  </div>
                  <div>
                    <label htmlFor="firstname">Phone number <i>(Optional)</i></label>
                    <input type="text" value={''} placeholder="Phone number" readOnly />
                  </div>
                  <div>
                    <button className="primary-btn">Update</button>
                  </div>
                </form>
              </div>
              <div className="user_general_information mt-6">
                <div className="user_general_information_header">
                  <h3 className="font-bold text-2xl text-[var(--color-darkest)]">Security</h3>
                </div>
                <form  className="user_general_information_fields">
                  <div>
                    <label htmlFor="firstname">Password</label>
                    <input type="text" placeholder="Password" />
                  </div>
                  <div>
                    <label htmlFor="lastname">Confirm Password</label>
                    <input type="text" placeholder="Password" />
                  </div>
                  <div>
                    <button className="primary-btn">Update</button>
                  </div>
                </form>
              </div>
              <div className="user_general_information mt-6">
                <div className="user_general_information_header">
                  <h3 className="font-bold text-2xl text-[var(--color-darkest)]">Location History</h3>
                </div>
                
              </div>
            </div>
          </main>
      </div>
    </div>
  )
}

export default UserProfile