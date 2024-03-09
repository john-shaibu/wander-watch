
import '../styles/sidenav.css'

import { Link, NavLink } from 'react-router-dom'

import { Discovery, Dashboard, Metrics, DefaultLogo } from '../assets'
import { Icon } from './Icon'

import {motion} from 'framer-motion'
import { useAnimate } from 'framer-motion'

import useClickOutside from "../hooks/useClickOutside";
import { useRef } from 'react'

import { CaretDropdownIcon } from '../assets'

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


const Sidenav = ({ toggleState }) => {
  const [ open, toggleOpen, set ] = toggleState
  const sidenavRef = useRef(null)

  useClickOutside(sidenavRef, (e) => {
    if (open && !(e.target.dataset?.toggle == 'sidenav' || e.target.parentElement.dataset?.toggle == 'sidenav')) set(false);
  })

  return (
    <aside className={`sidenav ${open ? ' open' : ''}`} ref={sidenavRef}>
      <Link to='/' className="logo">
        <DefaultLogo />
      </Link>
      <ul>
        {
          linkData.map((link) => {
            return (
              <li key={link.title} >
                <NavLink className={({ isActive }) => `${ isActive ? 'active primary-btn' : '' }`} to={link.link}>
                  {<Icon iconelement={link.icon} className={'icon'} />}
                  <span className='sidenav_tooltip'>{link.title}</span>
                </NavLink>
              </li>
            );
          })}
      </ul>
      <button className="sidenav-toggle" data-open={open} data-toggle="sidenav" onClick={() => toggleOpen()}><Icon iconelement={CaretDropdownIcon} data-toggle="sidenav" className={'aspect-square colored'}/></button>
    </aside>
  )
}

export default Sidenav