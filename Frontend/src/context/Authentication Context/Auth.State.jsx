import React, { useEffect, useState } from 'react'
import AuthContext from './Auth.Context'
import { toast } from 'react-toastify'

const AuthState = props => {
  const { children, setToken, setTrigger } = props
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const host = import.meta.env.VITE_HOST

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user')) || null
    if (getUser) {
      setUser(getUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password, isTrue) => {
    try {
      if (!email || !password) {
        toast.error('All fields are required')
        return
      }

      const response = await fetch(`${host}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, isTrue })
      })
      const data = await response.json()
      if (data.token) setToken(data.token)
      setTrigger(prev => !prev)
      localStorage.setItem('user', JSON.stringify(data.data))
      setUser(data.data)
      setLoading(false)
      toast.success(data.message)
    } catch (error) {
      console.error(error)
      toast.error('Login failed')
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch(`${host}auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      const { message } = await response.json()
      setUser(null)
      setToken(null)
      setTrigger(prev => !prev)
      toast.success(message)
    } catch (error) {
      console.error(error)
      toast.error('Logout failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
