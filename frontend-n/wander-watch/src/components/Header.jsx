import { NotifyIcon, SearchIcon } from '../assets'

import '../styles/header.css'

import MenuDropdown from './MenuDropdown';



const Header = () => {
  
  return (
    <header>
      <h2>Dashboard</h2>
      <div className="search_notification_menu">
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder='Search for a place' />
        </div>
        <div className="header_notification">
          <span>
            <NotifyIcon />
          </span>
          {/* <div className="notification_dropdown">
            notification_dropdown
          </div> */}
        </div>
        <MenuDropdown />
      </div>
    </header>
  )
}

export default Header