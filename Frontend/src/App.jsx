import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import contact from './assets/contact.png';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AuthState from './context/Authentication Context/Auth.State';
import GetState from './context/Custom Get Context/Get.State';
import PostState from './context/Custom Post Context/Post.State';
import Navbar from './components/Navbar/Navbar';
import Careers from './pages/Careers';
import CareersDetails from './pages/CareersDetails';
import Footer from './components/Footer/Footer';
import ContactForm from './components/ContactForm/ContactForm';
import Dashboard from './pages/Dashboard';
import PostBlog from './pages/PostBlog';
import PostJob from './pages/PostJob';
import EditBlog from './pages/EditBlog';
import EditJob from './pages/EditJob';
import EditBlogs from './pages/EditBlogs';
import EditJobs from './pages/EditJobs';
import PutState from './context/Custom Put Context/Put.State';
import { ToastContainer } from 'react-toastify';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const handleClick = () => {
    setFormVisible(!formVisible);
  };

  const calculatePosition = () => {
    return 'top-[85%]';
  };
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog/:id" element={<BlogDetails />} />
          <Route exact path="/careers" element={<Careers />} />
          <Route exact path="/careers/:id" element={<CareersDetails />} />
          <Route exact path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/post-blog" element={<PostBlog />} />
          <Route exact path="/admin/post-job" element={<PostJob />} />
          <Route exact path="/admin/edit-blog" element={<EditBlog />} />
          <Route exact path="/admin/edit-blog/:id" element={<EditBlogs />} />
          <Route exact path="/admin/edit-job" element={<EditJob />} />
          <Route exact path="/admin/edit-job/:id" element={<EditJobs />} />

          <Route exact path="/*" element={<NotFound />} />
        </Routes>

        <Footer />
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          onClick={handleClick}
          className={`z-50 md:h-14 md:w-14 h-14 w-14 fixed ${calculatePosition()} right-1 cursor-pointer`}
        >
          <img src={contact} alt="Contact" height={100} width={100} className='hover:scale-110 transition-all ease-in-out duration-300' />
        </motion.div>
        {formVisible && (
          <ContactForm onClose={handleClick} />
        )}
      </Router>
    </>
  );
}

const AppWrapper = () => {
  return (
    <AuthState>
      <GetState>
        <PostState>
          <PutState>
            <App />
            <ToastContainer />
          </PutState>
        </PostState>
      </GetState>
    </AuthState>
  )
}

export default AppWrapper;
