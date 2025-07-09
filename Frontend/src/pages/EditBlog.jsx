import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetContext from '../context/Custom Get Context/Get.Context'

const EditBlog = () => {
  const navigate = useNavigate()

  const getContext = useContext(GetContext)
  const { getDataFromAPI } = getContext

  const [blogData, setBlogData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    setLoading(true)
    const data = await getDataFromAPI('blog-posting/get-blog-postings')
    setBlogData(data)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const onClick = blog => {
    navigate(`/admin/edit-blog/${blog._id}`, { state: blog })
  }

  return (
    <main className='bg-[#f9f9f9] min-h-[calc(100dvh-60px)] py-8'>
      <div className='max-w-[1500px] mx-auto p-4 bg-white shadow rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Manage Blogs</h1>
        <div className='hidden md:block overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 text-left text-sm font-semibold text-gray-600'>
                <th className='py-3 px-4 border'>#</th>
                <th className='py-3 px-4 border'>Image</th>
                <th className='py-3 px-4 border'>Title</th>
                <th className='py-3 px-4 border'>Description</th>
                <th className='py-3 px-4 border'>Category</th>
                <th className='py-3 px-4 border'>Status</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7} className='py-3 px-4 border text-center'>
                    No blogs found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {blogData.map((blog, index) => (
                  <tr
                    onClick={() => onClick(blog)}
                    key={index}
                    className='text-sm text-gray-700 hover:bg-gray-50 cursor-pointer'
                  >
                    <td className='py-3 px-4 border'>{index + 1}</td>
                    <td className='py-3 px-4 border'>
                      <img
                        src={blog.image}
                        alt='blog'
                        className='h-16 w-20 object-cover rounded'
                      />
                    </td>
                    <td className='py-3 px-4 border'>{blog.title}</td>
                    <td className='py-3 px-4 border'>{blog.description}</td>
                    <td className='py-3 px-4 border'>{blog.category}</td>
                    <td className='py-3 px-4 border'>
                      <span
                        className={`px-3 py-0.5 text-center rounded-full text-xs font-medium ${
                          blog.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/* Mobile card view */}
        <div className='md:hidden space-y-4'>
          {blogData.map((blog, index) => (
            <div
              onClick={() => onClick(blog)}
              key={index}
              className='border p-4 rounded shadow-sm bg-white'
            >
              <div className='flex gap-4'>
                <img
                  src={blog.image}
                  alt='blog'
                  className='h-24 w-28 object-cover rounded'
                />
                <div className='flex flex-col justify-between'>
                  <h2 className='text-lg font-semibold'>{blog.title}</h2>
                  <p className='text-sm text-gray-600'>{blog.description}</p>
                  <p className='text-sm'>
                    <strong>Category:</strong> {blog.category}
                  </p>
                  <span
                    className={`mt-1 inline-block px-3 py-0.5 w-fit rounded-full text-xs font-medium ${
                      blog.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default EditBlog
