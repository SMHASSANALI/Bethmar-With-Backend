import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetContext from "../context/Custom Get Context/Get.Context";
import DeleteContext from "../context/Custom Delete Context/Delete.Context";

const EditBlog = () => {
  const navigate = useNavigate();

  const getContext = useContext(GetContext);
  const { getDataFromAPI } = getContext;

  const deleteContext = useContext(DeleteContext);
  const { deleteDataFromAPI } = deleteContext;

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await getDataFromAPI("blog-posting/get-blog-postings");
    setBlogData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onClick = (blog) => {
    navigate(`/admin/edit-blog/${blog._id}`, { state: blog });
  };

  const deleteBlog = async (id) => {
    setDeleteLoading(true);
    await deleteDataFromAPI(`blog-posting/delete-blog-posting/${id}`);
    getData();
    setDeleteLoading(false);
    setDeleteId(null);
  };

  return (
    <main className="bg-[#f9f9f9] min-h-[calc(100dvh-60px)] py-8">
      <div className="max-w-[1500px] mx-auto p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Image</th>
                <th className="py-3 px-4 border">Title</th>
                <th className="py-3 px-4 border">Description</th>
                <th className="py-3 px-4 border">Category</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="w-full">
                  <td
                    colSpan={7}
                    className="py-3 px-4 text-center animate-pulse"
                  >
                    <div className="mx-auto animate-spin h-6 w-6 border-2 border-accentGreen border-t-transparent rounded-full" />
                  </td>
                </tr>
              )}
              {!loading && blogData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-3 px-4 border text-center">
                    No blog found
                  </td>
                </tr>
              )}
              {!loading &&
                blogData.length > 0 &&
                blogData.map((blog, index) => (
                  <tr
                    key={index}
                    className="text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      {index + 1}
                    </td>
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      <img
                        src={blog.image}
                        alt="blog"
                        className="h-16 w-20 object-cover rounded"
                      />
                    </td>
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      {blog.title}
                    </td>
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      {blog.description}
                    </td>
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      {blog.category}
                    </td>
                    <td
                      onClick={() => onClick(blog)}
                      className="py-3 px-4 border"
                    >
                      <span
                        className={`px-3 py-0.5 text-center rounded-full text-xs font-medium ${
                          blog.status === "Active"
                            ? "bg-green-100 text-black"
                            : "bg-yellow-100 text-black"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-1 px-4 border">
                      <button
                        onClick={() => {
                          setDeleteId(blog._id);
                          deleteBlog(blog._id);
                        }}
                        className="flex items-center justify-center px-4 py-2 rounded-md w-fit text-sm font-medium bg-accentRed text-white"
                      >
                        {deleteLoading && blog._id === deleteId ? (
                          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-4">
          {blogData.map((blog, index) => (
            <div
              onClick={() => onClick(blog)}
              key={index}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="flex md:flex-row flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-8/12 object-cover rounded"
                  />
                  <div className="w-4/12 ml-auto flex flex-col items-end justify-start gap-[10px]">
                    <span
                      className={`mt-1 inline-block px-3 py-0.5 w-fit rounded-full text-xs font-medium ${
                        blog.status === "Active"
                          ? "bg-green-100 text-black"
                          : "bg-yellow-100 text-black"
                      }`}
                    >
                      {blog.status}
                    </span>
                    <button className="px-4 py-2 rounded-md w-fit text-sm font-medium bg-accentRed text-white">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-600">{blog.description}</p>
                  <p className="text-sm">
                    <strong>Category:</strong> {blog.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EditBlog;
