import React from 'react'

const Seprator = ({ color }) => {
    return (
        <div className='w-full max-w-[1500px] mx-auto'>
            <div className={`w-10/12 h-[4px] mx-auto my-12  ${color}`}></div>
        </div>
    )
}

export default Seprator