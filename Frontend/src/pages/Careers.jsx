import React from 'react';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
    const navigate = useNavigate();

    const jobListings = [
        {
            id: '1',
            jobTitle: 'Product Designer',
            jobDescription: 'We’re looking for a mid-level product designer to join our team.',
            requirements: ['3+ years of design experience', 'Proficient in Figma & Adobe XD'],
            qualifications: ['Bachelor’s degree in Design', 'Strong portfolio'],
            company: 'Bethmar Technologies',
            location: '100% Remote',
            benefits: ['Health insurance', 'Remote work stipend', '401k'],
            jobType: 'Full-time',
            status: 'Active',
            type: 'Full-time'
        },
        {
            id: '2',
            jobTitle: 'Engineering Manager',
            jobDescription: "We're looking for an experienced engineering manager to join our team.",
            requirements: ['3+ years of design experience', 'Proficient in Figma & Adobe XD'],
            qualifications: ['Bachelor’s degree in Design', 'Strong portfolio'],
            company: 'Bethmar Technologies',
            location: '100% Remote',
            benefits: ['Health insurance', 'Remote work stipend', '401k'],
            jobType: 'Full-time',
            status: 'Active',
            type: 'Full-time'
        },
        {
            id: '3',
            jobTitle: 'Customer Success Manager',
            jobDescription: "We're looking for a customer success manager to join our team.",
            requirements: ['3+ years of design experience', 'Proficient in Figma & Adobe XD'],
            qualifications: ['Bachelor’s degree in Design', 'Strong portfolio'],
            company: 'Bethmar Technologies',
            location: '100% Remote',
            benefits: ['Health insurance', 'Remote work stipend', '401k'],
            jobType: 'Full-time',
            status: 'Active',
            type: 'Full-time'
        }
    ];
    const onClick = (job) => {
        navigate(`/careers/${job.id}`, { state: job });
    }

    return (
        <div className="px-4 md:px-20 py-16 bg-white text-gray-800">
            <div className="mb-8">
                <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full inline-block mb-2">
                    We’re hiring!
                </span>
                <h1 className="text-4xl font-bold mb-4">Be part of our mission</h1>
                <p className="text-lg text-gray-600">
                    We're looking for passionate people to join us on our mission. We value flat hierarchies,
                    clear communication, and full ownership and responsibility.
                </p>
            </div>

            {/* <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 text-sm"
          >
            {filter}
          </button>
        ))}
      </div> */}

            <div className="space-y-6">
                {jobListings.map((job, index) => (
                    <div
                        key={index}
                        className="p-6 border border-gray-200 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-1">{job.jobTitle}</h2>
                            <p className="text-gray-600 mb-2">{job.jobDescription}</p>
                            <div className="flex gap-2 text-sm">

                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{job.location}</span>

                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{job.jobType}</span>
                            </div>
                        </div>

                        <button onClick={() => onClick(job)} className="mt-4 md:mt-0 flex items-center gap-1 text-blue-600 font-medium hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-all ease-in-out">
                            Apply
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nO3asWoWQRQG0GuCMegzKOoLWKUVbIXUKURBQbSzECztAkmhIYVFaovUgog+iz6BGoiFon+CR5akEFEyxcrmn3sPbD/zsTsze+dGlFJKKaWUUkqZHs7hKhYj4cSf48CRfTyMLLDl755F77CE7/7tafQMF53sSfQKZ/CpIYRH0SvcbQjgJx5Er7DeGML96BU2G0I4xK3oeD140RjCWnQcwk5DCDOsRo+wgJcNIfzAzegRFrHbEMI33Ige4SxeNYTwFdej46Py64YQvmDlfw3iAu4c79UbEzzbx4veSfZwbezJX8EH8+PjMOYxA3hn/rwZa/LLja/eaTMUVpbHqtTMzJ/ZKAEM8FbWT2CAy3gv6yI4wHncTrkNTu1UHISmkvooLPPPkMy/wzIXRGQviclcFJW5LI57aS9GHH33n9NejeFS9svRpdTX44OhESJtg8QfLTKz31pkHkfiJqmFqcdSSimllFJKKdGrXwe8Dt5fSxhZAAAAAElFTkSuQmCC" className='w-7 h-7 p-1 bg-blue-600 rounded-full -rotate-45' alt="" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Careers;
