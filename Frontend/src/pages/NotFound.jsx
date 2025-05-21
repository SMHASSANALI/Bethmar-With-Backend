import React, { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/'
        }, 1500)
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-accentRed-dark via-slate-950 to-black'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>Page Not Found</h1>
            <h1 className='text-6xl md:text-8xl font-bold text-white mb-4'>404</h1>
            <p className='text-lg md:text-xl text-white mb-4'>Sorry, the page you are looking for does not exist.</p>
            <p className='text-lg md:text-xl text-white mb-4'>You will be redirected to the homepage shortly.</p>
            <p className='text-lg md:text-xl text-white'>Please check the URL and try again.</p>
        </div>
    )
}

export default NotFound
