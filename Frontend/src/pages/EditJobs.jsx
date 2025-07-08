import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import PutContext from '../context/Custom Put Context/Put.Context';
import { toast } from 'react-toastify';

const EditJobs = () => {
    const { state } = useLocation();

    const { putDataFromAPI } = useContext(PutContext);

    const [jobTitle, setJobTitle] = useState(state.jobTitle);
    const [jobDescription, setJobDescription] = useState(state.jobDescription);
    const [jobType, setJobType] = useState(state.jobType);
    const [company, setCompany] = useState(state.company);
    const [location, setLocation] = useState(state.location);
    const [benefits, setBenefits] = useState(state.benefits || []);
    const [qualifications, setQualifications] = useState(state.qualifications || []);
    const [requirements, setRequirements] = useState(state.requirements || []);
    const [status, setStatus] = useState(state.status);

    const [editMode, setEditMode] = useState({
        jobTitle: false,
        company: false,
        location: false,
        jobDescription: false,
        jobType: false,
        benefits: false,
        qualifications: false,
        requirements: false,
        status: false,
    });

    const [editIndex, setEditIndex] = useState({
        requirements: null,
        qualifications: null,
        benefits: null,
    });

    const [newEntries, setNewEntries] = useState({
        requirements: "",
        qualifications: "",
        benefits: "",
    });

    const handleSave = async () => {
        console.log("Triggered")
        const updatedJob = {
            jobTitle, jobDescription, requirements, qualifications, company, location, benefits, jobType, status
        };
        console.log(updatedJob)
        try {
            await putDataFromAPI(`job-posting/update-job-posting/${state._id}`, updatedJob);
        } catch (error) {
            toast.error('Job update failed');
        }
    };

    const handleListChange = (setter, list, index, value) => {
        const updated = [...list];
        updated[index] = value;
        setter(updated);
    };

    const handleAddEntry = (key, setter, list) => {
        const value = newEntries[key].trim();
        if (!value) return;
        setter([...list, value]);
        setNewEntries((prev) => ({ ...prev, [key]: "" }));
    };

    const handleDeleteEntry = (index, setter, list) => {
        const updated = list.filter((_, i) => i !== index);
        setter(updated);
    };

    const renderEditableList = (label, items, setter, key) => (
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{label}</h2>
            <ul className="list-disc list-inside space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between gap-2">
                        {editIndex[key] === index ? (
                            <input
                                value={item}
                                onChange={(e) =>
                                    handleListChange(setter, items, index, e.target.value)
                                }
                                onBlur={() => setEditIndex((prev) => ({ ...prev, [key]: null }))}
                                autoFocus
                                className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:ring"
                            />
                        ) : (
                            <div className="flex justify-between w-full items-center">
                                <span>{item}</span>
                                <div className="flex items-center gap-2">
                                    <FiEdit2
                                        className="cursor-pointer text-gray-500"
                                        onClick={() =>
                                            setEditIndex((prev) => ({ ...prev, [key]: index }))
                                        }
                                    />
                                    <button
                                        onClick={() => handleDeleteEntry(index, setter, items)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    placeholder={`Add new ${key}`}
                    value={newEntries[key]}
                    onChange={(e) =>
                        setNewEntries((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                />
                <button
                    onClick={() => handleAddEntry(key, setter, items)}
                    className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition duration-300 ease-in-out"
                >
                    Add
                </button>
            </div>
        </section>
    );


    return (
        <div className="w-full px-6 py-10 max-w-5xl mx-auto">
            <main className="space-y-8">
                {/* Title */}
                <div className="flex items-center gap-3">
                    {editMode.jobTitle ? (
                        <input
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            onBlur={() => setEditMode({ ...editMode, jobTitle: false })}
                            autoFocus
                            className="text-4xl font-bold text-gray-800 border-b-2 border-gray-300 outline-none"
                        />
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-gray-800">{jobTitle}</h1>
                            <FiEdit2 onClick={() => setEditMode({ ...editMode, jobTitle: true })} className="cursor-pointer text-gray-500" />
                        </>
                    )}
                </div>

                {/* Company & Location */}
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                    {editMode.company ? (
                        <input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            onBlur={() => setEditMode({ ...editMode, company: false })}
                            autoFocus
                            className="border-b border-gray-300 outline-none"
                        />
                    ) : (
                        <span className="flex items-center gap-2">
                            {company}
                            <FiEdit2 onClick={() => setEditMode({ ...editMode, company: true })} className="cursor-pointer text-gray-500" />
                        </span>
                    )}
                    <span>•</span>
                    {editMode.location ? (
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onBlur={() => setEditMode({ ...editMode, location: false })}
                            autoFocus
                            className="border-b border-gray-300 outline-none"
                        />
                    ) : (
                        <span className="flex items-center gap-2">
                            {location}
                            <FiEdit2 onClick={() => setEditMode({ ...editMode, location: true })} className="cursor-pointer text-gray-500" />
                        </span>
                    )}
                </div>

                {/* Description */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
                    <div className="mt-2">
                        {editMode.jobDescription ? (
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                onBlur={() => setEditMode({ ...editMode, jobDescription: false })}
                                autoFocus
                                className="w-full border border-gray-300 rounded p-3"
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <p className="text-gray-700">{jobDescription}</p>
                                <FiEdit2 onClick={() => setEditMode({ ...editMode, jobDescription: true })} className="cursor-pointer text-gray-500" />
                            </div>
                        )}
                    </div>
                </section>

                {/* Requirements */}
                <section>
                    {renderEditableList("Requirements", requirements, setRequirements, "requirements")}
                </section>

                {/* qualifications */}
                <section>
                    {renderEditableList("Qualifications", qualifications, setQualifications, "qualifications")}
                </section>

                {/* Benefits */}
                <section>
                    {renderEditableList("Benefits", benefits, setBenefits, "benefits")}
                </section>

                {/* Job Type */}
                <section className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Job Type:</h2>
                    {editMode.jobType ? (
                        <input
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            onBlur={() => setEditMode({ ...editMode, jobType: false })}
                            autoFocus
                            className="border-b border-gray-300 outline-none"
                        />
                    ) : (
                        <>
                            <span className="text-gray-700">{jobType}</span>
                            <FiEdit2 onClick={() => setEditMode({ ...editMode, jobType: true })} className="cursor-pointer text-gray-500" />
                        </>
                    )}
                </section>

                {/* Status */}
                <section className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Status:</h2>
                    {editMode.status ? (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            onBlur={() => setEditMode({ ...editMode, status: false })}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                        </select>
                    ) : (
                        <>
                            <span className="text-gray-700">{status}</span>
                            <FiEdit2 onClick={() => setEditMode({ ...editMode, status: true })} className="cursor-pointer text-gray-500" />
                        </>
                    )}
                </section>

                {/* Save Button */}
                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition duration-300 ease-in-out"
                    >
                        Save Changes
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EditJobs;
