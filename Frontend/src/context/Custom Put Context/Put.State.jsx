import React, { useState } from 'react'
import PutContext from './Put.Context'
import { toast } from 'react-toastify'

const PutState = props => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { children, token, setToken } = props
  const host = import.meta.env.VITE_HOST

  const putDataFromAPI = async (endpoint, formData) => {
    setLoading(true)
    try {
      const response = await fetch(`${host}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      // if (response.status === 401) {
      //   localStorage.removeItem('user')
      //   setToken(null)
      //   window.location.href = '/login'
      // }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      if (data.message) {
        toast.success(data.message)
        return data?.data
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  const putDataFromAPI2 = async (endpoint, formData) => {
    setLoading(true)
    try {
      const response = await fetch(`${host}${endpoint}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: formData
      })

      // if (response.status === 401) {
      //   localStorage.removeItem('user')
      //   setToken(null)
      //   window.location.href = '/login'
      // }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      if (data.message) {
        toast.success(data.message)
        return data?.data
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PutContext.Provider
      value={{
        loading,
        error,
        putDataFromAPI,
        putDataFromAPI2
      }}
    >
      {children}
    </PutContext.Provider>
  )
}

export default PutState
