import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PostContext from '../context/Custom Post Context/Post.Context'

const PostJob = () => {
  const postContext = useContext(PostContext)
  const { postDataFromAPI } = postContext

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    requirements: [],
    qualifications: [],
    company: '',
    location: '',
    benefits: [],
    jobType: 'Full-time'
  })

  const onChange = e => {
    if (
      e.target.name === 'requirements' ||
      e.target.name === 'qualifications' ||
      e.target.name === 'benefits'
    ) {
      const values = e.target.value.split(',').map(value => value.trim())
      setFormData({
        ...formData,
        [e.target.name]: values
      })
      return
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateFormData = formData => {
    const requiredFields = [
      'jobTitle',
      'jobDescription',
      'requirements',
      'qualifications',
      'company',
      'location',
      'benefits',
      'jobType'
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

      await postDataFromAPI('job-posting/create-job-posting', formData)
      navigate('/admin/edit-job')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='bg-[#f9f9f9] py-8'>
      <div className='max-w-4xl mx-auto p-4 bg-white shadow rounded'>
        <h2 className='text-2xl font-bold mb-4 text-primary'>Post New Job</h2>
        <form onSubmit={onSubmit} className='bg-white  space-y-4'>
          <input
            type='text'
            placeholder='Job Title'
            name='jobTitle'
            className='w-full p-2 border rounded'
            value={formData.jobTitle}
            onChange={onChange}
          />
          <textarea
            placeholder='Job Description'
            name='jobDescription'
            className='w-full p-2 border rounded'
            value={formData.jobDescription}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Requirements (comma separated)'
            name='requirements'
            className='w-full p-2 border rounded'
            value={formData.requirements.join(', ')}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Qualifications (comma separated)'
            name='qualifications'
            className='w-full p-2 border rounded'
            value={formData.qualifications.join(', ')}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Company Name'
            name='company'
            className='w-full p-2 border rounded'
            value={formData.company}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Location / remote'
            name='location'
            className='w-full p-2 border rounded'
            value={formData.location}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Benefits (comma separated)'
            name='benefits'
            className='w-full p-2 border rounded'
            value={formData.benefits.join(', ')}
            onChange={onChange}
          />
          <select
            name='jobType'
            className='w-full p-2 border rounded'
            value={formData.jobType}
            onChange={onChange}
          >
            <option value='Full-time'>Full-time</option>
            <option value='Part-time'>Part-time</option>
            <option value='Contract'>Contract</option>
          </select>
          <button
            className='bg-primary w-full text-white px-4 py-2 mt-4 rounded hover:bg-primary-dark transition duration-300 ease-in-out'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default PostJob
