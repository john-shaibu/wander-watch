
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import Map from '../components/Map'
import LocationHistory from '../components/LocationHistory'
import { useToggle } from '../hooks/useToggle'
import { useNavigate } from 'react-router-dom'
import { LoginInfoHOC } from '../components/HOCs/loginInfoHOC'
import { useEffect } from 'react'



const Dashboard = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState

  


  return (
    <div className="main-container">
      <PageHelmet title='Dashboard' keywords='location tracker, wander watch, location monitor' description='Wander watch Dashboard page' />
      <Header headerName='Dashboard' />
      <Sidenav toggleState={toggleState}  />
      <div className={`side-nav-underlay${open ? ' open': ''}`}></div>
      <div className="wrapper">
        <main>
          <Map />
          <LocationHistory />
        </main>
      </div>
    </div>
  )
}


const DashboardRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('login')
  }, [])

  return 
}


const DashboardPage = () => {
  return <LoginInfoHOC fallback={<DashboardRedirect />} errorElement={<DashboardRedirect />}>{(data) => {
     return <Dashboard />
  }}</LoginInfoHOC>
}


export default DashboardPage