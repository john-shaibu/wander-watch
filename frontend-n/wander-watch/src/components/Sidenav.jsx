import { BlackLogo } from '../assets'
import '../styles/sidenav.css'

import { Link } from 'react-router-dom'

const linkData = [
  {
    title: 'dashboard',
    link : '/',
    icon: '',
  },
  {
    title: 'Activities',
    link : '/',
    icon: '',
  },
  {
    title: 'Metrics',
    link : '/',
    icon: '',
  }
  
]

const Sidenav = () => {
  return (
    <aside>
      <Link to='/' className="logo">
        <BlackLogo />
      </Link>
      <ul>
        <li>
          <Link></Link>
          <span></span>
        </li>
      </ul>
    </aside>
  )
}

export default Sidenav