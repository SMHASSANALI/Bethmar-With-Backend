import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails.jsx';
import NotFound from './pages/NotFound';
import AuthState from './context/Authentication Context/Auth.State';
import GetState from './context/Custom Get Context/Get.State';
import PostState from './context/Custom Post Context/Post.State';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blog/:id" element={<BlogDetails />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
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
