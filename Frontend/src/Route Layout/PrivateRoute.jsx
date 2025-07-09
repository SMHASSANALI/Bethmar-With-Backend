import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children, isAuthorized, authorizedLink }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthorized) {
      navigate(authorizedLink)
    }
  }, [])
  if (isAuthorized === null) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='loader' />{' '}
        {/* Add Tailwind spinner or your custom loader */}
      </div>
    )
  }

  return isAuthorized ? children : <Navigate to='/login' />
}

export default PrivateRoute
