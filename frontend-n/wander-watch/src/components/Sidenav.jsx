
import '../styles/sidenav.css'

import { Link, NavLink } from 'react-router-dom'

import { Discovery, Dashboard, Metrics, DefaultLogo } from '../assets'
import { Icon } from './Icon'

import {motion} from 'framer-motion'
import { useAnimate } from 'framer-motion'


const linkData = [
  {
    title: 'Dashboard',
    link : '/',
    icon: Dashboard,
  },
  {
    title: 'Discover',
    link : '/discover',
    icon: Discovery
  },
  {
    title: 'Metrics',
    link : '/metrics',
    icon: Metrics,
  }
  
]


const Sidenav = () => {
  return (
    <aside>
      <Link to='/' className="logo">
        <DefaultLogo />
      </Link>
      <ul>
        {
          linkData.map((link) => {
            return (
              <li key={link.title} >
                {console.log(link)}
                <NavLink className={({ isActive }) => `${ isActive ? 'active primary-btn' : '' }`} to={link.link}>
                  {<Icon iconelement={link.icon} className={'icon'} />}
                  <span className='sidenav_tooltip'>{link.title}</span>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </aside>
  )
}

export default Sidenav