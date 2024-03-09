
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import PageHelmet from '../components/Helmet'

import '../styles/dashboard.css'
import { useToggle } from '../hooks/useToggle'


const Metrics = () => {

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
           this is the metrics page
        </main>
      </div>
    </div>
  )
}

export default Metrics