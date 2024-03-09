import { useToggle } from "../hooks/useToggle";
import { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { Icon } from './Icon';
import { Link } from 'react-router-dom'
import { CaretDropdownIcon,PreferenceIcon,SettingsIcon,SignoutIcon,UserAvatar } from '../assets'
import { Profile } from "../assets";


const dropdownContent = [
    {
        title: 'Your Profile',
        url: '/profile',
        icon: Profile,
    },
    {
        title: 'Preferences',
        url: '/preferences',
        icon: PreferenceIcon,
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
              <b>John Shaibu</b>
              <span>johnmaxwell059@gmail.com</span>
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