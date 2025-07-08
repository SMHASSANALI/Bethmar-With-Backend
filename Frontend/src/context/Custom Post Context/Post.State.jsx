import React, { useState } from 'react'
import PostContext from './Post.Context'
import { toast } from 'react-toastify'

const PostState = props => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { children, token } = props
  const host = import.meta.env.VITE_HOST

  const postDataFromAPI = async (endpoint, formData) => {
    setLoading(true)
    try {
      const response = await fetch(`${host}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      // if (response.status === 401) {
      //     localStorage.removeItem('user');
      //     window.location.href = '/login';
      // }

      const data = await response.json()

      if (response.status === 200) {
        toast.success(data.message)
        return data?.data
      } else {
        toast.error(data.message)
        throw new Error('Unexpected API response')
      }
    } catch (error) {
      console.error('API Error:', error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const postDataFromAPI2 = async (endpoint, formData) => {
    setLoading(true)
    try {
      const response = await fetch(`${host}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: formData
      })

      const data = await response.json()

      if (response.status === 200) {
        toast.success(data.message)
        return data?.data
      } else {
        toast.error(data.message)
        throw new Error('Unexpected API response')
      }
    } catch (error) {
      console.error('API Error:', error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <PostContext.Provider
      value={{
        loading,
        error,
        postDataFromAPI,
        postDataFromAPI2
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostState
