import React from 'react';

const Blogs = ({
  title,
  date,
  description,
  image,
  category = 'Blog',
  onClick,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto flex flex-col h-full cursor-pointer">
      <img
        onClick={onClick}
        src={image}
        alt="Blog Cover"
        className="w-full h-48 object-cover rounded-t-xl"
      />
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
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
