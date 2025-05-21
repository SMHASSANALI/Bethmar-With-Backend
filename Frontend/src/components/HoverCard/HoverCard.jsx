import React from 'react';

const HoverCard = ({ title, list, imgSrc, desc }) => {
    const divStyle = {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <div style={divStyle} className='h-[400px] w-[300px] mx-auto lg:h-[400px] lg:w-[100%] group shadow-primary-light shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 rounded'>
            <div className='flex flex-col justify-end text-white h-full w-full'>
                <div className='h-full px-2 py-4 bg-primary-dark bg-opacity-10 bg-gradient-to-t from-primary-dark flex flex-col justify-end rounded'>
                    <h2 className='text-xl font-medium font-oswald mb-2'>{title}</h2>
                    <p className='text-xs mb-2'>{desc}</p>
                    <ul className='text-sm font-thin font-montserrat mx-4 list-disc'>
                        {list.map((item, index) => (
                            <li className='font-semibold' key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HoverCard;