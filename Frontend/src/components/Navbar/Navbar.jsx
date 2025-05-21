import React, { useState } from 'react';
import bethmarLogo from '../../assets/Logo/bethmar.png';
import { Link as ScrollLink } from 'react-scroll';
import ContactForm from '../ContactForm/ContactForm';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import jCoffey from '../../assets/Logo/JCoffeylogo.jpg'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setFormVisible(!formVisible);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='z-[9999] w-full text-white bg-neutral-900 sticky top-0'>
            <section className=' bg-neutral-800'>
                <div className='md:flex justify-start items-center max-w-[1500px] text-xs flex-row  mx-auto py-1'>
                    <div className='flex items-center gap-4 px-4'>
                        <a href="https://www.facebook.com"
                            className='flex items-end gap-1 group transition-colors duration-300'
                            target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5rem" height="1.5rem" viewBox="0 0 48 48">
                                <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                            </svg>
                            <p className='text-sm font-poppins group-hover:text-blue-600 transition-colors duration-300'>Facebook</p>
                        </a>
                        <a href="https://www.linkedin.com/in/bethmar-limited-47a762244/?trk=public_post_reshare_feed-actor-name&originalSubdomain=uk"
                            className='flex items-end gap-1 group transition-colors duration-300'
                            target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5rem" height="1.5rem" viewBox="0 0 48 48">
                                <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
                            </svg>
                            <span className='text-sm font-poppins group-hover:text-blue-400 transition-colors duration-300'>LinkedIn</span>
                        </a>

                        <a href="https://www.jcoffey.com" className='rounded-sm overflow-hidden flex items-end gap-1 group text-white hover:text-green-500 transition-colors duration-300' target="_blank" rel="noopener noreferrer">
                            <img src={jCoffey} className='size-5' />
                            <span className='sm:text-xs text-sm font-poppins group-hover:text-green-500 transition-colors duration-300'>J Coffey</span>
                        </a>
                    </div>
                </div>
            </section>

            <div className='flex flex-row items-center justify-between mx-auto max-w-[1500px] py-1 px-4'>
                <ScrollLink
                    to='Banner'
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                >
                    <div className='h-auto w-24 md:w-36 flex justify-center items-center py-1'>
                        <img src={bethmarLogo} alt="Bethmar Logo" className='w-full h-auto' />
                    </div>
                </ScrollLink>
                <div className='hidden md:flex ml-auto px-[16px] md:px-[32px] items-center gap-4 md:gap-8 font-poppins text-sm md:text-base'>
                    <ScrollLink
                        to='About'
                        smooth={true}
                        duration={500}
                        className='cursor-pointer'
                    >
                        About
                    </ScrollLink>
                    <ScrollLink
                        to='Services'
                        smooth={true}
                        duration={500}
                        className='cursor-pointer'
                    >
                        Services
                    </ScrollLink>
                </div>
                <div className='hidden md:flex'>
                    <ScrollLink
                        onClick={handleClick}
                        to='Footer'
                        smooth={true}
                        duration={500}
                        className='cursor-pointer'
                    >
                        Contact Us
                    </ScrollLink>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-2xl text-white focus:outline-none"
                    >
                        {menuOpen ? (
                            <IoMdClose className="transition-transform transform rotate-180 duration-300" />
                        ) : (
                            <IoMdMenu className="transition-transform transform rotate-0 duration-300" />
                        )}
                    </button>
                </div>
            </div>
            {
                menuOpen && (
                    <div className="md:hidden flex flex-col items-start gap-4 mt-4 font-poppins text-sm rounded-lg py-2 px-4">
                        <ScrollLink
                            to='About'
                            smooth={true}
                            duration={500}
                            className='cursor-pointer border-b border-slate-500 w-full'
                            onClick={toggleMenu}
                        >
                            About
                        </ScrollLink>
                        <ScrollLink
                            to='Services'
                            smooth={true}
                            duration={500}
                            className='cursor-pointer border-b border-slate-500 w-full'
                            onClick={toggleMenu}
                        >
                            Services
                        </ScrollLink>
                        <ScrollLink
                            onClick={handleClick}
                            to='Footer'
                            smooth={true}
                            duration={500}
                            className='cursor-pointer'
                        >
                            Contact
                        </ScrollLink>
                    </div>
                )
            }

            {
                formVisible && (
                    <ContactForm onClose={handleClick} />
                )
            }
        </div >
    )
}

export default Navbar;
