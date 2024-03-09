import { Routes, Route } from "react-router-dom"

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Discover from "./pages/Discover"
import Metrics from "./pages/Metrics"
import UserProfile from "./pages/UserProfile"
import UserPreferences from "./pages/UserPreferences"
import Settings from "./pages/Settings"



const WebRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='discover' element={<Discover />} />
        <Route path='metrics' element={<Metrics />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='preferences' element={<UserPreferences />} />
        <Route path='settings' element={<Settings />} />
    </Routes>
  )
}

export default WebRoutes