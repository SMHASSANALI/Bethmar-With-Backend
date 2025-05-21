import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import logo from '../../assets/Logo/bethmar.png'
import Fiber from '../../assets/footer/Footer.jpeg'
import EUSRtrainer from '../../assets/trainer/EUSR_training.jpg';
import Chas from '../../assets/trainer/chas.png';
import Usag from '../../assets/trainer/USAGLogo.jpg';

const Footer = () => {
    const divStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)) , url(${Fiber})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'relative',
    }

    return (
        <div id='Footer' style={divStyle} className="py-6 md:py-6 text-white">
            <div className="max-w-[1400px] flex flex-col md:flex-row justify-between mx-auto border-b border-gray-700 px-4 md:px-0">
                <div className="text-sm md:text-base w-full lg:w-6/12 mb-2 flex flex-col justify-around">
                    <img src={logo} alt="Company Logo" className="w-4/12 lg:w-3/12 h-[75px] mb-3" />
                    <div className='self-center w-full'>
                        <p className='pb-2 flex font-light'><span className='mr-2 text-nowrap font-montserrat font-medium'>Location :</span> Suite 1, Wentworth Lodge, Great North Road, Welwyn Garden City, AL8 7SR</p>
                        <p className='pb-2 flex font-light'><span className='mr-2 text-nowrap font-montserrat font-medium'>Email :</span> contact@bethmar.co.uk</p>
                    </div>
                </div>
                <div className='flex flex-col lg:justify-between w-full lg:w-4/12 md:mb-2 mb-0'>
                    <div className="flex flex-row gap-x-6 lg:ml-auto pb-6">
                        <a className='flex items-center lg:text-sm text-xs' target='_blank' href=''><FaSquareFacebook className='h-8 w-8 hover:scale-110 hover:-rotate-45 ease-in-out duration-300 transition-all mr-[2px]' />Facebook</a>
                        <a className='flex items-center lg:text-sm text-xs' target='_blank' href='https://www.linkedin.com/in/bethmar-limited-47a762244/?trk=public_post_reshare_feed-actor-name&originalSubdomain=uk'><FaLinkedin className='h-8 w-8 hover:scale-110 hover:-rotate-45 ease-in-out duration-300 transition-all mr-[2px]' />Linkedin</a>
                    </div>
                    <div className='flex flex-row gap-y-2 items-center justify-between md:justify-end'>
                        <div className='w-4/12 md:mb-2 mb-6'>
                            <img src={Usag} alt="" className='w-auto h-[150px]' />
                        </div>
                        <div className='flex flex-col gap-x-2 w-6/12'>
                            <div className='md:mb-2 mb-6'>
                                <img src={EUSRtrainer} alt="" className='w-auto h-[70px]' />
                            </div>
                            <div className='md:mb-2 mb-6 bg-slate-900 items-center flex justify-center'>
                                <img src={Chas} alt="" className='w-auto h-[70px]' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="pt-4 text-center text-xs md:text-sm max-w-[1400px] mx-auto px-4 md:px-0 ">
                <div className="flex justify-between items-center">
                    <div className='self-center'>
                        <span>© 2024 Bethmar Ltd. All rights reserved.</span>
                    </div>
                    <div>
                        <a href='https://www.saskasolutions.com/' target='_blank' className='border-b border-gray-400 text-xs font-extralight font-mono text-gray-400'>Designed and Developed by SASKA Solutions</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
