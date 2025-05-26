import React, { useState } from 'react';

const Blogs = ({
    title,
    date,
    description,
    image,
    category = 'Blog',
    onClick,
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto flex flex-col h-full">
            <div
                className="relative w-full h-48 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}
            >
                <img
                    src={image}
                    alt="Blog Cover"
                    className={`w-full h-full object-cover transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}
                />
                {hovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
                        <div className='flex flex-col items-center bg-[#26803d] p-2 rounded-full'>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nO3asWoWQRQG0GuCMegzKOoLWKUVbIXUKURBQbSzECztAkmhIYVFaovUgog+iz6BGoiFon+CR5akEFEyxcrmn3sPbD/zsTsze+dGlFJKKaWUUkqZHs7hKhYj4cSf48CRfTyMLLDl755F77CE7/7tafQMF53sSfQKZ/CpIYRH0SvcbQjgJx5Er7DeGML96BU2G0I4xK3oeD140RjCWnQcwk5DCDOsRo+wgJcNIfzAzegRFrHbEMI33Ige4SxeNYTwFdej46Py64YQvmDlfw3iAu4c79UbEzzbx4veSfZwbezJX8EH8+PjMOYxA3hn/rwZa/LLja/eaTMUVpbHqtTMzJ/ZKAEM8FbWT2CAy3gv6yI4wHncTrkNTu1UHISmkvooLPPPkMy/wzIXRGQviclcFJW5LI57aS9GHH33n9NejeFS9svRpdTX44OhESJtg8QfLTKz31pkHkfiJqmFqcdSSimllFJKKdGrXwe8Dt5fSxhZAAAAAElFTkSuQmCC" className='w-10 h-10 -rotate-45' alt="" />
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-sm font-semibold text-blue-600">{category}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {description.slice(0, 80)}...
                    </p>
                </div>
                <div className="flex justify-end items-center text-xs text-gray-500 mt-4">
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
