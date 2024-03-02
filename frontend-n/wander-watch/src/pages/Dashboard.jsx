
import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

const Dashboard = () => {
  return (
    <div className="grid main-container">
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