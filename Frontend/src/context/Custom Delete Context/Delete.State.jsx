import React, { useState } from 'react'
import DeleteContext from './Delete.Context'
import { toast } from 'react-toastify'

const DeleteState = props => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { children, token } = props
  const host = import.meta.env.VITE_HOST

  const deleteDataFromAPI = async endpoint => {
    setLoading(true)
    try {
      const response = await fetch(`${host}${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (response.status === 401) {
        localStorage.removeItem('user')
        window.location.href = '/login'
      }

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
    <DeleteContext.Provider
      value={{
        loading,
        error,
        deleteDataFromAPI
      }}
    >
      {children}
    </DeleteContext.Provider>
  )
}

export default DeleteState
