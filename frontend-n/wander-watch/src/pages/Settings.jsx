
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import '../styles/settings.css'
import { useToggle } from '../hooks/useToggle'


const Settings = () => {

  const toggleState = useToggle(false)
  const [open,] = toggleState


  return (
    <div className="main-container">
      <PageHelmet title='Dashboard' keywords='location tracker, wander watch, location monitor' description='Wander watch Dashboard page' />
      <Header headerName='Metrics' />
      <Sidenav toggleState={toggleState}  />
      <div className={`side-nav-underlay${open ? ' open': ''}`}></div>
      <div className="wrapper">
        <main>
           <div className='settings-container'>
            <div>
            <h2>General Settings</h2>
            </div>
           </div>
        </main>
      </div>
    </div>
  )
}

export default Settings