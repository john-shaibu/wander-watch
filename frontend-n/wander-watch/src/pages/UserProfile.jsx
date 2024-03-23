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
import { CalendarIcon, ClockIcon, EditIcon } from "../assets";
import { useAsync } from "../hooks/useAsync";
import { getProfile } from "../request";
import Loader from "../components/WebLoader";



const dateFormatter = (date) => {
  switch (date) {
    case 1:
      return 'January'
      break;
  
    case 2:
      return 'February'
      break;
  
    case 3:
      return 'March'
      break;
  
    case 4:
      return 'April'
      break;
  
    case 5:
      return 'May'
      break;
  
    case 6:
      return 'June'
      break;
  
    case 7:
      return 'July'
      break;
  
    case 8:
      return 'August'
      break;
  
    case 9:
      return 'September'
      break;
  
    case 10:
      return 'October'
      break;
  
    case 11:
      return 'November'
      break;
  
    case 12:
      return 'December'
      break;
  
    default:
      break;
  }
}

const UserProfile = () => {
  const { value: profileData, loading:loadingUserData } = useAsync(getProfile())
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
        {loadingUserData ? <Loader loaderMessage={'Trying to get your information'} /> : 
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
                  <form className="user_general_information_fields">
                    <div>
                      <label htmlFor="firstname">Firstname</label>
                      
                      <input type="text" value={profileData?.fullname.split(' ')[0]} placeholder="firstname" readOnly />
                    </div>
                    <div>
                      <label htmlFor="lastname">lastname</label>
                      <input type="text" value={profileData?.fullname.split(' ')[1]} placeholder="lastname" readOnly />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input type="text" value={profileData.email} placeholder="Email" readOnly />
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
              <form className="user_general_information_fields">
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
              <div className="user_loction_history_contsiner flex flex-col gap-4">
                {profileData.locations.splice(0, 10).map((userloactions, key) => {
                  return(
                    <div key={key} className=" border border-[#ddd] p-4 rounded-lg flex flex-col gap-4 cursor-pointer" >
                        <b>{userloactions.name}</b>
                        <div className="flex items-left gap-2 flex-col">
                          <p className="flex items-center gap-2">
                            <CalendarIcon />
                            {userloactions.timestamp.split('-')[2].split('T')[0]} - {dateFormatter(Number((userloactions.timestamp.split('-')[1])))} - {userloactions.timestamp.split('-')[0]}
                          </p>
                          <p className="flex items-center gap-2">
                            <ClockIcon />
                            {userloactions.timestamp.split('-')[2].split('T')[1].split(':')[0]} : {userloactions.timestamp.split('-')[2].split('T')[1].split(':')[1]} {userloactions.timestamp.split('-')[2].split('T')[1].split(':')[0] > 12 ? 'PM' : 'AM'}
                          </p>
                        </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>}
        </main>
      </div>
    </div>
  )
}

export default UserProfile