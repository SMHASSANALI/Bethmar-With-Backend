import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import contact from './assets/contact.png';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound';
import AuthState from './context/Authentication Context/Auth.State';
import GetState from './context/Custom Get Context/Get.State';
import PostState from './context/Custom Post Context/Post.State';
import Navbar from './components/Navbar/Navbar.jsx';
import Careers from './pages/Careers.jsx';
import CareersDetails from './pages/CareersDetails.jsx';
import Footer from './components/Footer/Footer.jsx';
import ContactForm from './components/ContactForm/ContactForm.jsx';

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
          <App />
        </PostState>
      </GetState>
    </AuthState>
  )
}

export default AppWrapper;
