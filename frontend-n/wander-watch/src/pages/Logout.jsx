import React from 'react'
import { useTimeout } from '../hooks/useTimeout'
import { useMutation } from '../hooks/useMutation'
import { LogoutUser } from '../request'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/WebLoader'

export const Logout = () => {
    const navigate = useNavigate()
    const logoutMutation = useMutation(LogoutUser)
    useTimeout(() => {
        logoutMutation.mutate({}, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }, 3000, true)

  return (
    <Loader loaderMessage='logging you out...' className='h-[100vh] items-center' />
  )
}
