
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import Map from '../components/Map'
import LocationHistory from '../components/LocationHistory'


const Dashboard = () => {

  return (
    <div className="main-container">
      <PageHelmet title='Dashboard' keywords='location tracker, wander watch, location monitor' description='Wander watch Dashboard page' />
      <Header />
      <Sidenav />
      <div className="wrapper">
        <main>
          <Map />
          <LocationHistory />
        </main>
      </div>
    </div>
  )
}

export default Dashboard