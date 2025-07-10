import React, { useContext, useState, useEffect } from 'react'
import bethmarLogo from '../assets/Logo/bethmar.png'
import AuthContext from '../context/Authentication Context/Auth.Context'
import { useNavigate } from 'react-router-dom'

const Login = ({ isAuthorized }) => {
  const context = useContext(AuthContext)
  const { login } = context

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) {
      navigate('/admin/dashboard')
    }
  }, [isAuthorized])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isTrue: false
  })

  const onChange = e => {
    if (e.target.name === 'isTrue') {
      e.target.value === 'on'
        ? setFormData({ ...formData, isTrue: true })
        : setFormData({ ...formData, isTrue: false })
      return
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async e => {
    e.preventDefault()
    await login(formData.email, formData.password, formData.isTrue)
    setFormData({
      email: '',
      password: '',
      isTrue: false
    })
  }
  return (
    <div className='md:h-[calc(100vh-7rem)] h-[calc(100vh-5rem)] w-full relative overflow-hidden bg-[#f9f9f9]'>
      <div
        className='absolute inset-0 bg-cover bg-center md:static md:w-1/2'
        style={{
          backgroundImage: `url('https://wearepantera.com/cdn/shop/files/Fondo_pantera.png?v=1708085407&width=2000')`
        }}
      />

      <div className='absolute inset-0 bg-black/50 md:hidden z-10' />

      <div className='relative z-20 flex flex-col md:flex-row md:h-[calc(100vh-7rem)] h-[calc(100vh-5rem)] w-full md:p-0 p-2'>
        <div className='w-full md:w-1/2 h-full flex'>
          <div className='m-auto bg-white p-8 rounded-xl w-full max-w-md shadow-xl'>
            <form onSubmit={onSubmit} className='space-y-5'>
              <input
                type='email'
                placeholder='Email address'
                className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600'
                value={formData.email}
                name='email'
                onChange={onChange}
              />
              <input
                type='password'
                placeholder='Password'
                className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600'
                value={formData.password}
                name='password'
                onChange={onChange}
              />
              <div className='flex items-center justify-between text-sm text-gray-500'>
                <label>
                  <input
                    type='checkbox'
                    name='isTrue'
                    onChange={onChange}
                    className='mr-2 cursor-pointer'
                  />
                  Remember me
                </label>
              </div>
              <div className='flex gap-3'>
                <button
                  type='submit'
                  className='bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition'
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className='hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative'
          style={{
            backgroundImage: `url('https://wearepantera.com/cdn/shop/files/Fondo_pantera.png?v=1708085407&width=2000')`
          }}
        >
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md flex items-center justify-center flex-col gap-4 px-8 py-4'>
            <img
              src={bethmarLogo}
              className='w-48 bg-black p-2 rounded-xl'
              alt='logo'
            />
            <div className='text-center md:text-left'>
              <h2 className='text-2xl font-bold text-gray-800 text-center'>
                Content Management System
              </h2>
              <p className='text-gray-500 mt-1 text-center'>
                Powered by{' '}
                <a
                  href='https://saskasolutions.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-green-600 hover:text-green-800 transition'
                >
                  Saska Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
