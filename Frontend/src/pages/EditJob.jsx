import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GetContext from '../context/Custom Get Context/Get.Context'
import DeleteContext from '../context/Custom Delete Context/Delete.Context'

const EditJob = () => {
  const navigate = useNavigate()

  const getContext = useContext(GetContext)
  const { getDataFromAPI } = getContext

  const deleteContext = useContext(DeleteContext)
  const { deleteDataFromAPI } = deleteContext

  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [jobData, setJobData] = useState([])


  const getData = async () => {
    setLoading(true)
    const data = await getDataFromAPI('job-posting/get-job-postings')
    setJobData(data)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteJob = async jobId => {
    try {
      setDeleteLoading(true)
      await deleteDataFromAPI(`job-posting/delete-job-posting/${jobId}`)
      getData()
      setDeleteLoading(false)
      setDeleteId(null)
    } catch (error) {
      console.error(error)
    }
  }

  const onClick = job => {
    navigate(`/admin/edit-job/${job._id}`, { state: job })
  }

  return (
    <main className='bg-[#f9f9f9] py-8 min-h-[calc(100vh-7rem)]'>
      <div className='max-w-[1500px] p-4 mx-auto bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
        <h1 className='text-2xl font-bold mb-4'>Manage Jobs</h1>
        <div className='hidden md:block overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 text-left text-sm font-semibold text-gray-600'>
                <th className='py-3 px-4 border'>#</th>
                <th className='py-3 px-4 border'>Title</th>
                <th className='py-3 px-4 border'>Description</th>
                <th className='py-3 px-4 border'>Type</th>
                <th className='py-3 px-4 border'>Location</th>
                <th className='py-3 px-4 border'>Company</th>
                <th className='py-3 px-4 border'>Status</th>
                <th className='py-3 px-4 border'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className='w-full'>
                  <td
                    colSpan={6}
                    className='py-3 px-4 text-center animate-pulse'
                  >
                    <div className='mx-auto animate-spin h-6 w-6 border-2 border-accentGreen border-t-transparent rounded-full' />
                  </td>
                </tr>
              )}
              {!loading && jobData.length === 0 && (
                <tr>
                  <td colSpan={6} className='py-3 px-4 border text-center'>
                    No blog found
                  </td>
                </tr>
              )}
              {jobData &&
                jobData.map((job, index) => (
                  <tr
                    key={index}
                    className='text-sm text-gray-700 hover:bg-gray-50 cursor-pointer'
                  >
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {index + 1}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {job.jobTitle}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {job.jobDescription}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {job.jobType}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {job.location}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      {job.company}
                    </td>
                    <td
                      onClick={() => onClick(job)}
                      className='py-3 px-4 border'
                    >
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                          job.status === 'Active'
                            ? 'bg-green-100 text-black'
                            : 'bg-yellow-100 text-black'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className='py-3 px-4 border'>
                      <button
                        onClick={() => {
                          setDeleteId(job._id);
                          deleteJob(job._id);
                        }}
                        className="flex items-center justify-center px-4 py-2 rounded-md w-fit text-sm font-medium bg-accentRed text-white"
                      >
                        {deleteLoading && job._id === deleteId ? (
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
        <div className='md:hidden space-y-4'>
          {jobData.map((job, index) => (
            <div
              onClick={() => onClick(job)}
              key={index}
              className='border p-4 rounded shadow-sm bg-white'
            >
              <div className='flex flex-col gap-[10px] justify-between'>
                <div className='flex flex-row items-start justify-between'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full w-fit text-sm font-medium ${
                      job.status === 'Active'
                        ? 'bg-green-100 text-black'
                        : 'bg-yellow-100 text-black'
                    }`}
                  >
                    {job.status}
                  </span>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className='inline-block px-4 py-2 rounded-md w-fit text-sm font-medium bg-accentRed text-white'
                  >
                    Delete
                  </button>
                </div>
                <h2 className='text-lg font-semibold'>{job.jobTitle}</h2>
                <p className='text-sm text-gray-600'>{job.jobDescription}</p>
                <p className='text-sm pt-[10px]'>
                  <strong>Category:</strong> {job.jobType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default EditJob
