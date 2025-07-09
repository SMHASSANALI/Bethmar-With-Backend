import React from "react";
import { useLocation } from "react-router-dom";

const CareerDetail = () => {
  const { state } = useLocation();

  return (
    <main className="bg-[#f9f9f9] py-8">
      <div className="max-w-[1500px] mx-auto w-full p-4 relative flex flex-col gap-[60px] md:flex-row items-start justify-between">
        <main className="w-full md:w-5/12 h-full">
          <div className="flex flex-row items-start justify-between">
            <h1 className="text-4xl font-bold text-gray-800">
              {state.jobTitle}
            </h1>
            <p className="text-sm px-4 py-2 bg-primary-dark rounded-full text-white">
              {state.jobType} • {state.status}
            </p>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            {state.company} • {state.location}
          </p>

          <section className="mt-4">
            <h2 className="text-2xl font-semibold">Job Description</h2>
            <p className="mt-1 text-primary-light">{state.jobDescription}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold">Requirements</h2>
            <ul className="list-disc list-inside text-primary-light mt-1">
              {state.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <ul className="list-disc list-inside text-gray-700">
              {state.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">Benefits</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {state.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>
        </main>
        <section className="sticky right-0 top-0 w-full md:w-7/12 border h-full p-6 bg-[#f8f8f8] rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Apply Now</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full p-3 border rounded"
            />
            <textarea
              placeholder="Your motto / motivation"
              className="w-full p-3 border rounded"
              rows="4"
            ></textarea>
            <input type="file" className="w-full p-2 border rounded" />
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
            >
              Submit Application
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default CareerDetail;
