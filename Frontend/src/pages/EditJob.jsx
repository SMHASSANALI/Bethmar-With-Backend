import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GetContext from '../context/Custom Get Context/Get.Context'

const EditJob = () => {
  const navigate = useNavigate();

  const getContext = useContext(GetContext)
  const { getDataFromAPI } = getContext
  const [loading, setLoading] = useState(false)

  const [jobData, setJobData] = useState([])
  const getData = async () => {
    setLoading(false)
    const data = await getDataFromAPI('job-posting/get-job-postings')
    setJobData(data)
    setLoading(true)
  }

  useEffect(() => {
    getData()
  }, [])

  const onClick = (job) => {
    navigate(`/admin/edit-job/${job._id}`, { state: job });
  };

  return (
    <main className="bg-[#f9f9f9] py-8 min-h-[calc(100vh-7rem)]">
      <div className="max-w-[1500px] p-4 mx-auto bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Title</th>
                <th className="py-3 px-4 border">Description</th>
                <th className="py-3 px-4 border">Type</th>
                <th className="py-3 px-4 border">Location</th>
                <th className="py-3 px-4 border">Company</th>
                <th className="py-3 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job, index) => (
                <tr
                  onClick={() => onClick(job)}
                  key={index}
                  className="text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4 border">{index + 1}</td>
                  <td className="py-3 px-4 border">{job.jobTitle}</td>
                  <td className="py-3 px-4 border">{job.jobDescription}</td>
                  <td className="py-3 px-4 border">{job.jobType}</td>
                  <td className="py-3 px-4 border">{job.location}</td>
                  <td className="py-3 px-4 border">{job.company}</td>
                  <td className="py-3 px-4 border">
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-100 text-black"
                          : "bg-yellow-100 text-black"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile card view */}
        <div className="md:hidden space-y-4">
          {jobData.map((job, index) => (
            <div
              onClick={() => onClick(job)}
              key={index}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="flex gap-4">
                <div className="flex flex-col justify-between">
                  <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                  <p className="text-sm text-gray-600">{job.jobDescription}</p>
                  <p className="text-sm">
                    <strong>Category:</strong> {job.jobType}
                  </p>
                  <span
                    className={`3t-1 0.5nline-block px-2 py-1 rounded-full w-fit text-xs font-medium ${
                      job.status === "Active"
                        ? "bg-green-100 text-black"
                        : "bg-yellow-100 text-black"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EditJob;
