import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PostContext from '../context/Custom Post Context/Post.Context'

const PostBlog = () => {
  const postContext = useContext(PostContext)
  const { postDataFromAPI } = postContext

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    content: '',
    status: 'Active'
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleContentChange = value => {
    setFormData({ ...formData, content: value })
  }

  const validateFormData = formData => {
    const requiredFields = [
      'title',
      'description',
      'image',
      'category',
      'content',
      'status'
    ]

    const missingFields = requiredFields.filter(field => {
      const value = formData[field]
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      )
    })

    return missingFields
  }

  const onSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      const missingFields = validateFormData(formData)
      if (missingFields.length > 0) {
        toast.error('Please fill in the following fields:', missingFields)
        return
      }

      await postDataFromAPI('blog-posting/create-blog-posting', formData)
      navigate('/admin/edit-blog')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='bg-[#f9f9f9] py-8'>
      <div className='max-w-4xl mx-auto p-4 bg-white shadow rounded'>
        <h2 className='text-2xl font-bold mb-4 text-primary'>
          Post a New Blog
        </h2>
        <form onSubmit={onSubmit} className='space-y-4 gap-4 flex flex-col'>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Blog Title'
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Short Description'
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='Image URL'
            required
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            placeholder='Category'
            required
            className='w-full p-2 border rounded'
          />
          <div>
            <label className='block mb-1 font-medium text-gray-700'>
              Content
            </label>
            <ReactQuill
              value={formData.content}
              theme='snow'
              placeholder='Write your blog content here...'
              onChange={handleContentChange}
              className='h-[200px] mb-10'
            />
          </div>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          >
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-300'
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Blog'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default PostBlog
