import React from 'react';
import { useLocation } from 'react-router-dom';
import Seprator from '../components/Seprator/Seprator';

const BlogDetails = () => {
    const { state } = useLocation();
    const contentWithLines = state.content.replace(/<br\s*\/?>/g, '<div class="custom-line"></div>');

    return (
        <div className='bg-[#f9f9f9]'>
            <div className="max-w-6xl mx-auto px-4 py-8 font-sans bg-[#f6f8f7]">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {state.title}
                        </h1>
                        <p className="text-gray-600 text-lg mb-6">{state.description}</p>

                        <div className="text-sm text-gray-500 flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-200">
                            <p>
                                Written by: <span className="text-blue-600 font-medium">BethMar</span>
                            </p>
                            <p>
                                Category: <span className="text-blue-600 font-medium">{state.category}</span>
                            </p>
                            <p>
                                Published: {new Date(state.createdAt).toLocaleDateString()}
                                {' | '}
                                <span className="text-gray-700">Updated:</span>{' '}
                                {new Date(state.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex-shrink-0 mx-auto">
                        <img
                            src={state.image}
                            alt="Blog visual"
                            className="rounded-lg shadow-md w-full max-w-md"
                        />
                    </div>
                </div>

                <Seprator color={'bg-moving-gradient'} />

                <div
                    className="mt-10 prose prose-lg prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentWithLines }}
                />
            </div>
        </div>
    );
};

export default BlogDetails;
