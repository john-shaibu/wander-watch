import { Routes, Route } from "react-router-dom"

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const WebRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default WebRoutes