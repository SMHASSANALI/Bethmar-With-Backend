import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetContext from "../context/Custom Get Context/Get.Context";

const Careers = () => {
  const navigate = useNavigate();

  const context = useContext(GetContext);
  const { getDataFromAPI } = context;

  const [jobListings, setJobListings] = useState([]);

  const getData = async () => {
    const data = await getDataFromAPI("job-posting/get-active-jobs");
    setJobListings(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onClick = (job) => {
    navigate(`/careers/${job._id}`, { state: job });
  };

  return (
    <main className="bg-[#f9f9f9] py-8">
      <div className="max-w-[1500px] mx-auto rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-4 bg-white text-gray-800">
        <div className="mb-8 py-[30px]">
          <span className="text-sm bg-secondary-dark px-3 py-1 rounded-full inline-block mb-1 text-white">
            We’re hiring!
          </span>
          <h1 className="font-oswald text-2xl lg:text-4xl font-semibold tracking-wide leading-tight mb-4">
            Be part of our mission
          </h1>
          <p className="text-sm lg:text-base font-light font-Poppins text-gray-700 max-w-3xl">
            We're looking for passionate people to join us on our mission. We
            value flat hierarchies, clear communication, and full ownership and
            responsibility.
          </p>
        </div>

        <div className="space-y-[30px]">
          {jobListings.map((job, index) => (
            <div
              key={index}
              className="py-6 px-2 border-y border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center transition"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{job.jobTitle}</h2>
                <p className="text-gray-600 mb-2">{job.jobDescription}</p>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {job.location}
                  </span>

                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {job.jobType}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onClick(job)}
                className="mt-4 md:mt-0 flex items-center gap-1 text-primary font-medium hover:bg-primary hover:text-white pr-2 pl-4 py-2 rounded-full transition-all ease-in-out"
              >
                Apply
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nO3asWoWQRQG0GuCMegzKOoLWKUVbIXUKURBQbSzECztAkmhIYVFaovUgog+iz6BGoiFon+CR5akEFEyxcrmn3sPbD/zsTsze+dGlFJKKaWUUkqZHs7hKhYj4cSf48CRfTyMLLDl755F77CE7/7tafQMF53sSfQKZ/CpIYRH0SvcbQjgJx5Er7DeGML96BU2G0I4xK3oeD140RjCWnQcwk5DCDOsRo+wgJcNIfzAzegRFrHbEMI33Ige4SxeNYTwFdej46Py64YQvmDlfw3iAu4c79UbEzzbx4veSfZwbezJX8EH8+PjMOYxA3hn/rwZa/LLja/eaTMUVpbHqtTMzJ/ZKAEM8FbWT2CAy3gv6yI4wHncTrkNTu1UHISmkvooLPPPkMy/wzIXRGQviclcFJW5LI57aS9GHH33n9NejeFS9svRpdTX44OhESJtg8QfLTKz31pkHkfiJqmFqcdSSimllFJKKdGrXwe8Dt5fSxhZAAAAAElFTkSuQmCC"
                  className="w-7 h-7 p-1 bg-[#26803d] rounded-full -rotate-45"
                  alt=""
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Careers;
