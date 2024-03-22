import { useToggle } from "../hooks/useToggle";
import { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { Icon } from './Icon';
import { Link } from 'react-router-dom'
import { CaretDropdownIcon,PreferenceIcon,SettingsIcon,SignoutIcon,UserAvatar } from '../assets'
import { Profile } from "../assets";
import { useAsync } from "../hooks/useAsync";
import { getProfile } from "../request";

const dropdownContent = [
    {
        title: 'Your Profile',
        url: '/profile',
        icon: Profile,
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: SettingsIcon,
    },
    {
        title: 'Sign out',
        url: '/sign-out',
        icon: SignoutIcon,
    },
]

const MenuDropdown = () => {

    const { value: profileData, loading:loadingUserData } = useAsync(getProfile())

    const [dropdownOpen, toggleDropdownOpen, set] = useToggle(false)
    const dropdownRef = useRef(null)
    
    useClickOutside(dropdownRef, (e) => {
        set(false)
    })
  return (
    <div className="menu_dropdown" ref={dropdownRef}>
          <div className='user_toggle_dropdown' onClick={() => toggleDropdownOpen()}>
            <div className="dp">
              <UserAvatar />
            </div>
            <div className="name_and_email">

              <b>{loadingUserData ? 'loading...' : profileData.fullname}</b>
              <span>{loadingUserData ? 'loading...' : profileData.email}</span>
            </div>
            <span className='caret'>
              <Icon 
                iconelement={CaretDropdownIcon}
                className = {`${dropdownOpen ? 'rotate' : ''}`}
                style={{ transform: dropdownOpen ? 'rotateY(180deg)' : '' }}
              />
            </span>
          </div>
          <div className={`dropdown_container ${dropdownOpen ? ' open' : ''}`}>
            <ul>
                {
                    dropdownContent.map((content, key) => {
                        return(
                            <li key={key}>
                                <Link to={content.url}>
                                    <Icon iconelement={content.icon} />
                                    <p>{content.title}</p>
                                </Link>
                            </li>
                        )
                    })
                }
              
            </ul>
          </div>
        </div>
  )
}

export default MenuDropdown