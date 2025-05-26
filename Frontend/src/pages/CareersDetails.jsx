import React from 'react';
import { useLocation } from 'react-router-dom';

const CareerDetail = () => {
    const { state } = useLocation();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-gray-800">{state.jobTitle}</h1>
            <p className="text-gray-600 mt-2">{state.company} • {state.location}</p>
            <p className="text-sm text-gray-500 mt-1">{state.jobType} • {state.status}</p>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p className="mt-2 text-gray-700">{state.jobDescription}</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    {state.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    {state.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    {state.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
            </section>

            <section className="mt-10 border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">Apply Now</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
                    <input type="tel" placeholder="Contact Number" className="w-full p-3 border rounded" />
                    <textarea placeholder="Your motto / motivation" className="w-full p-3 border rounded" rows="4"></textarea>
                    <input type="file" className="w-full p-2 border rounded" />
                    <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition">
                        Submit Application
                    </button>
                </form>
            </section>
        </div>
    );
};

export default CareerDetail;
