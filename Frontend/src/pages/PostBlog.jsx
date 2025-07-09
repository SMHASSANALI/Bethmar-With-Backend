import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    content: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="bg-[#f9f9f9] py-8">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Post a New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 gap-4 flex flex-col">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              value={formData.content}
              theme="snow"
              placeholder="Write your blog content here..."
              onChange={handleContentChange}
              className="h-[200px] mb-10"
            />
          </div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-300"
          >
            Post Blog
          </button>
        </form>
      </div>
    </main>
  );
};

export default PostBlog;
