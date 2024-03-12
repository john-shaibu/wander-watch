
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'
import TimeDropdown from '../components/TimeDropDown'
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
      <div className="settings-wrapper">
        <main>
           <div className='settings-container'>
            <div>
            <h2 className='font-[700] text-[20px]'>General Settings</h2>
            <div className='flex'>
              <div>
                <h3 className=' font-[600] text-[16px] my-5'>Tracking Interval</h3>
                <p className='text-[#878CA8] text-[10px] pr-6'>This setting controls how often the app updates your location. A shorter interval means more frequent updates, which can drain your battery faster, but provides a more precise track of your movements. A longer interval uses less battery but may not capture your location as accurately, especially if you're moving quickly</p>
              </div>
              <div className='w-55'>
<TimeDropdown/>
              </div>
            </div>
            </div>
           </div>
        </main>
      </div>
    </div>
  )
}

export default Settings