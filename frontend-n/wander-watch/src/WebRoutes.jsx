import { Outlet, RouterProvider, createBrowserRouter, defer, useResolvedPath } from "react-router-dom"

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Discover from "./pages/Discover"
import Metrics from "./pages/Metrics"
import UserProfile from "./pages/UserProfile"
import UserPreferences from "./pages/UserPreferences"
import Settings from "./pages/Settings"
import UpdatePassword from "./pages/UpdatePassword"
import OtpVerifcation from "./pages/OtpVerifcation"
import { pingLogin } from "./request"
import { useEffect } from "react"


const BaseElement = () => {
  const navigation = useResolvedPath()
  useEffect(() => {
    console.log(navigation);
  }, [navigation])
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <BaseElement />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'login',
        element: <Login />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'register',
        element: <Register />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'discover',
        element: <Discover />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },

      {
        path: 'metrics',
        element: <Metrics />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'profile',
        element: <UserProfile />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'preferences',
        element: <UserPreferences />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'settings',
        element: <Settings />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'otp-verification',
        element: <OtpVerifcation />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      },
      {
        path: 'update-password',
        element: <UpdatePassword />,
        loader: () => {
          const userInformation = pingLogin()
    
          return defer({ userInformation })
        }
      }
    ]
  }
])

const WebRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default WebRoutes