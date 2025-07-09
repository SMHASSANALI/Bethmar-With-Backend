import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FiEdit2 } from 'react-icons/fi'
import Seprator from '../components/Seprator/Seprator'
import PutContext from '../context/Custom Put Context/Put.Context'
import { toast } from 'react-toastify'

const EditBlogs = () => {
  const { state } = useLocation()

  const putContext = useContext(PutContext)
  const { putDataFromAPI } = putContext

  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(state.title)
  const [description, setDescription] = useState(state.description)
  const [category, setCategory] = useState(state.category)
  const [image, setImage] = useState(state.image)
  const [content, setContent] = useState(state.content)
  const [status, setStatus] = useState(state.status)

  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
    category: false,
    image: false,
    content: false,
    status: false
  })

  const handleSave = async () => {
    const updatedBlog = {
      title,
      description,
      image,
      category,
      content,
      status
    }
    try {
      setLoading(true)
      await putDataFromAPI(
        `blog-posting/update-blog-posting/${state._id}`,
        updatedBlog
      )
      setLoading(false)
    } catch (error) {
      toast.error('Blog updated failed')
    }
  }

  return (
    <main className='bg-[#f9f9f9] py-8'>
      <div className='max-w-[1500px] mx-auto p-4 '>
        {loading ? (
          <div className='flex items-center justify-center h-screen'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
          </div>
        ) : (
          <>
            {' '}
            <div className='font-sans p-6 bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
              {/* Title */}
              <div className='flex items-center gap-2 mb-4'>
                {editMode.title ? (
                  <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={() => setEditMode({ ...editMode, title: false })}
                    autoFocus
                    className='text-4xl font-bold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none w-full'
                  />
                ) : (
                  <>
                    <h1 className='text-4xl font-bold text-gray-800'>
                      {title}
                    </h1>
                    <FiEdit2
                      className='text-gray-500 cursor-pointer'
                      onClick={() => setEditMode({ ...editMode, title: true })}
                    />
                  </>
                )}
              </div>

              <div className='flex items-center gap-2 mb-6'>
                {editMode.description ? (
                  <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={() =>
                      setEditMode({ ...editMode, description: false })
                    }
                    autoFocus
                    className='w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none'
                  />
                ) : (
                  <>
                    <p className='text-lg text-gray-600'>{description}</p>
                    <FiEdit2
                      className='text-gray-500 cursor-pointer'
                      onClick={() =>
                        setEditMode({ ...editMode, description: true })
                      }
                    />
                  </>
                )}
              </div>

              {/* Category */}
              <div className='flex items-center gap-2 mb-6'>
                {editMode.category ? (
                  <input
                    type='text'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    onBlur={() => setEditMode({ ...editMode, category: false })}
                    autoFocus
                    className='w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none'
                  />
                ) : (
                  <>
                    <p className='text-lg text-gray-600'>{category}</p>
                    <FiEdit2
                      className='text-gray-500 cursor-pointer'
                      onClick={() =>
                        setEditMode({ ...editMode, category: true })
                      }
                    />
                  </>
                )}
              </div>

              {/* Status */}
              <div className='flex items-center gap-2 mb-6'>
                {editMode.status ? (
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    onBlur={() => setEditMode({ ...editMode, status: false })}
                    autoFocus
                    className='w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none'
                  >
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                ) : (
                  <>
                    <p className='text-lg text-gray-600'>{status}</p>
                    <FiEdit2
                      className='text-gray-500 cursor-pointer'
                      onClick={() => setEditMode({ ...editMode, status: true })}
                    />
                  </>
                )}
              </div>

              {/* Blog Metadata */}
              <div className='text-sm text-gray-500 flex flex-wrap gap-4 pt-4 border-t border-gray-200 mb-6'>
                <p>
                  Written by:{' '}
                  <span className='text-blue-600 font-medium'>BethMar</span>
                </p>
                <p>
                  Category:{' '}
                  <span className='text-blue-600 font-medium'>{category}</span>
                </p>
                <p>
                  Published: {new Date(state.createdAt).toLocaleDateString()} |
                  <span className='text-gray-700 ml-1'>Updated:</span>{' '}
                  {new Date(state.updatedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Image */}
              <div className='mb-8'>
                <div className='relative w-full max-w-md mx-auto'>
                  <img
                    src={image}
                    alt='Blog visual'
                    className='rounded-lg shadow-md w-full'
                  />
                  <FiEdit2
                    className='absolute top-2 right-2 text-white bg-black/50 p-1 rounded cursor-pointer'
                    onClick={() =>
                      setEditMode({ ...editMode, image: !editMode.image })
                    }
                  />
                </div>
                {editMode.image && (
                  <div className='mt-3'>
                    <input
                      type='text'
                      value={image}
                      onChange={e => setImage(e.target.value)}
                      onBlur={() => setEditMode({ ...editMode, image: false })}
                      autoFocus
                      className='w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none'
                    />
                    {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
                  </div>
                )}
              </div>

              <Seprator color={'bg-moving-gradient'} />

              {/* Content */}
              <div className='mt-10'>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='text-xl font-semibold'>Content</h2>
                  <FiEdit2
                    className='text-gray-500 cursor-pointer'
                    onClick={() =>
                      setEditMode({ ...editMode, content: !editMode.content })
                    }
                  />
                </div>
                {editMode.content ? (
                  <ReactQuill
                    theme='snow'
                    value={content}
                    onChange={setContent}
                  />
                ) : (
                  <div
                    className='prose prose-lg prose-blue max-w-none'
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
              </div>

              {/* Save Button */}
              <div className='mt-6'>
                <button
                  onClick={handleSave}
                  className='px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition duration-300 ease-in-out'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default EditBlogs
