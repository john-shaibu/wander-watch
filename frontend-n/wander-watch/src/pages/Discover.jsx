
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import { useToggle } from '../hooks/useToggle'
import Map from '../components/Map'
import Filter from '../components/Filter'
import DiscoveryMap from '../components/DiscoveryMap'

import { LoginInfoHOC } from '../components/HOCs/loginInfoHOC'
import { useNavigate } from 'react-router-dom'


const Discover = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState


  return (
    <div className="main-container">
      <PageHelmet title='Dashboard' keywords='location tracker, wander watch, location monitor' description='Wander watch Dashboard page' />
      <Header headerName='Discover' />
      <Sidenav toggleState={toggleState}  />
      <div className={`side-nav-underlay${open ? ' open': ''}`}></div>
      <div className="wrapper">
        <main>
           <DiscoveryMap />
           <Filter />
        </main>
      </div>
    </div>
  )
}

const DiscoverRedirect = () => {
  const navigate = useNavigate()

  navigate('/')
}


const DiscoverPage = () => {
  return <LoginInfoHOC fallback={<DiscoverRedirect />} errorElement={<DiscoverRedirect />}>{(data) => {
     return <Discover />
  }}</LoginInfoHOC>
}


export default DiscoverPage