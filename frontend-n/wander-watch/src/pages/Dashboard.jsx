
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import '../styles/dashboard.css'

const Dashboard = () => {
  return (
    <div className="main-container">
      <Header />
      <Sidenav />
      <div className="wrapper">
        <main className="">
          main body
        </main>
      </div>
    </div>
  )
}

export default Dashboard