import { NotifyIcon, SearchIcon } from '../assets'

import '../styles/header.css'
import { LoginInfoHOC } from './HOCs/loginInfoHOC';

import MenuDropdown from './MenuDropdown';

const AuthButtons = () => {
  return <div>Login</div>
}

const Header = (props) => {
  const headerName = props.headerName
  return (
    <header>
      <h2>{headerName}</h2>
      <div className="search_notification_menu">
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder='Search for a place' />
        </div>
        <div className="search_on_mobile">
          <SearchIcon />
        </div>
        <div className="header_notification">
          <span>
            <NotifyIcon />
          </span>
          {/* <div className="notification_dropdown">
            notification_dropdown
          </div> */}
        </div>
        <LoginInfoHOC fallback={<AuthButtons/>} errorElement={<AuthButtons/>}>{  user => <MenuDropdown user={user}/> }</LoginInfoHOC>
      </div>
    </header>
  )
}

export default Header