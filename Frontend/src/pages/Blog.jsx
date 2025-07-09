import React, { useState, useEffect, useContext } from "react";
import Blogs from "../components/Blogs/Blogs";
import { useNavigate } from "react-router-dom";
import GetContext from "../context/Custom Get Context/Get.Context";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  const getContext = useContext(GetContext);
  const { getDataFromAPI } = getContext;

  const getData = async () => {
    const data = await getDataFromAPI("blog-posting/get-active-blogs");
    setBlogData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handleBlogClick = (blogData) => {
    navigate(`/blog/${blogData._id}`, { state: blogData });
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <div className="relative">
        <div className="max-w-[1500px] mx-auto gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 py-8">
          {blogData &&
            blogData.length > 0 &&
            blogData.map((blog, index) => {
              return (
                <Blogs
                  key={index}
                  title={blog.title}
                  date={blog.createdAt}
                  description={blog.description}
                  image={blog.image}
                  category={blog.category}
                  author={blog.author}
                  content={blog.content}
                  onClick={() => handleBlogClick(blog)}
                />
              );
            })}
        </div>
        {/* <Seprator color={'bg-moving-gradient'} /> */}
      </div>
    </div>
  );
};

export default Blog;
