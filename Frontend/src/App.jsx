import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from 'react-router-dom'
import { motion } from 'framer-motion'
import contact from './assets/contact.png'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import AuthState from './context/Authentication Context/Auth.State'
import GetState from './context/Custom Get Context/Get.State'
import PostState from './context/Custom Post Context/Post.State'
import Navbar from './components/Navbar/Navbar'
import Careers from './pages/Careers'
import CareersDetails from './pages/CareersDetails'
import Footer from './components/Footer/Footer'
import ContactForm from './components/ContactForm/ContactForm'
import Dashboard from './pages/Dashboard'
import PostBlog from './pages/PostBlog'
import PostJob from './pages/PostJob'
import EditBlog from './pages/EditBlog'
import EditJob from './pages/EditJob'
import EditBlogs from './pages/EditBlogs'
import EditJobs from './pages/EditJobs'
import PutState from './context/Custom Put Context/Put.State'
import { ToastContainer } from 'react-toastify'
import EditHomePage from './pages/EditHomePage'
import PrivateRoute from './Route Layout/PrivateRoute'

function ScrollToTop () {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App ({ isAuthorized }) {
  const [formVisible, setFormVisible] = useState(false)
  const handleClick = () => {
    setFormVisible(!formVisible)
  }

  const calculatePosition = () => {
    return 'top-[85%]'
  }

  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/blog/:id' element={<BlogDetails />} />
          <Route exact path='/careers' element={<Careers />} />
          <Route exact path='/careers/:id' element={<CareersDetails />} />
          <Route
            exact
            path='/login'
            element={<Login isAuthorized={isAuthorized} />}
          />

          {/* Private Routes */}
          <Route
            path='/admin/dashboard'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/dashboard'}
                isAuthorized={isAuthorized}
              >
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/post-blog'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/post-blog'}
                isAuthorized={isAuthorized}
              >
                <PostBlog />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/post-job'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/post-job'}
                isAuthorized={isAuthorized}
              >
                <PostJob />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/edit-blog'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/edit-blog'}
                isAuthorized={isAuthorized}
              >
                <EditBlog />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/edit-blog/:id'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/edit-blog/:id'}
                isAuthorized={isAuthorized}
              >
                <EditBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/edit-job'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/edit-job'}
                isAuthorized={isAuthorized}
              >
                <EditJob />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/edit-job/:id'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/edit-job/:id'}
                isAuthorized={isAuthorized}
              >
                <EditJobs />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/edit-home-page'
            exact
            element={
              <PrivateRoute
                authorizedLink={'/admin/edit-home-page'}
                isAuthorized={isAuthorized}
              >
                <EditHomePage />
              </PrivateRoute>
            }
          />

          <Route exact path='/*' element={<NotFound />} />
        </Routes>

        <Footer />
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          onClick={handleClick}
          className={`z-50 md:h-14 md:w-14 h-14 w-14 fixed ${calculatePosition()} right-1 cursor-pointer`}
        >
          <img
            src={contact}
            alt='Contact'
            height={100}
            width={100}
            className='hover:scale-110 transition-all ease-in-out duration-300'
          />
        </motion.div>
        {formVisible && <ContactForm onClose={handleClick} />}
      </Router>
    </>
  )
}

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(null)

  const [token, setToken] = useState(null)

  const [trigger, setTrigger] = useState(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const host = import.meta.env.VITE_HOST
        const res = await fetch(`${host}auth/check-auth`, {
          method: 'GET',
          headers: {
            'auth-token': token
          },
          credentials: 'include'
        })
        const data = await res.json()
        if (res.ok && data?.user) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (err) {
        setIsAuthorized(false)
      }
    }

    checkAuth()
  }, [trigger])
  return (
    <AuthState setToken={setToken} setTrigger={setTrigger}>
      <GetState token={token} setToken={setToken}>
        <PostState token={token} setToken={setToken}>
          <PutState token={token} setToken={setToken}>
            <App isAuthorized={isAuthorized} />
            <ToastContainer />
          </PutState>
        </PostState>
      </GetState>
    </AuthState>
  )
}

export default AppWrapper
