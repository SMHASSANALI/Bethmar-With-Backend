import React, { useState } from 'react';

const PostJob = () => {

    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        requirements: [],
        qualifications: [],
        company: '',
        location: '',
        benefits: [],
        jobType: 'Full-time',
    });

    const onChange = (e) => {
        if (e.target.name === "requirements" || e.target.name === "qualifications" || e.target.name === "benefits") {
            const values = e.target.value.split(",").map(value => value.trim());
            setFormData({
                ...formData,
                [e.target.name]: values,
            });
            return;
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Post New Job</h2>
            <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <input type="text" placeholder="Job Title" name="jobTitle" className="w-full p-2 border rounded" value={formData.jobTitle} onChange={onChange} />
                <textarea placeholder="Job Description" name="jobDescription" className="w-full p-2 border rounded" value={formData.jobDescription} onChange={onChange} />
                <input type="text" placeholder="Requirements (comma separated)" name="requirements" className="w-full p-2 border rounded" value={formData.requirements.join(", ")} onChange={onChange} />
                <input type="text" placeholder="Qualifications (comma separated)" name="qualifications" className="w-full p-2 border rounded" value={formData.qualifications.join(", ")} onChange={onChange} />
                <input type="text" placeholder="Company Name" name="company" className="w-full p-2 border rounded" value={formData.company} onChange={onChange} />
                <input type="text" placeholder="Location / remote" name="location" className="w-full p-2 border rounded" value={formData.location} onChange={onChange} />
                <input type="text" placeholder="Benefits (comma separated)" name="benefits" className="w-full p-2 border rounded" value={formData.benefits.join(", ")} onChange={onChange} />
                <select name="jobType" className="w-full p-2 border rounded" value={formData.jobType} onChange={onChange}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                </select>
                <button className="bg-primary w-full text-white px-4 py-2 rounded" type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;
