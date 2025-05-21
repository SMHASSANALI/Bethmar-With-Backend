import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import Background from '../../assets/BG/Background.webp';

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        }
    }
};

const divStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6)), url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};


const Services = () => {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

    return (<>
        <div style={divStyle} id='Services' className='flex justify-center items-center lg:py-12 '>
            <div className='lg:py-6 bg-white px-4 py-2 container max-w-[1500px] rounded shadow-lg lg:mx-auto mx-4 flex items-center'>
                <div className=''>
                    <div className=' flex flex-col lg:flex-row py-6'>
                        <motion.div
                            className='lg:px-0 px-4 w-12/12 lg:w-4/12'
                            ref={ref}
                            initial='hidden'
                            animate={inView ? 'visible' : 'hidden'}
                            variants={fadeInUp}
                        >
                            <motion.h1
                                animate={{ opacity: inView ? 1 : 0, }}
                                transition={{ duration: 1, ease: "linear" }}
                                className=' mx-auto font-semibold text-2xl lg:text-4xl font-oswald lg:pb-0 pb-4 text-start text-primary'>
                                Services & Solutions for Your Needs
                            </motion.h1>
                        </motion.div>
                        <motion.div
                            className='lg:px-0 px-4 w-12/12 lg:w-6/12 ml-auto'
                            ref={ref}
                            initial='hidden'
                            animate={inView ? 'visible' : 'hidden'}
                            variants={fadeInUp}
                        >
                            <p className='text-sm lg:text-base font-light font-poppins text-primary-light'>
                                At Bethmar, we offer a wide range of infrastructure, telecom, and traffic management services to meet your specific requirements.
                                From full telecom turnkey to traffic management solutions, our experienced team is dedicated to delivering high-quality results.
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 lg:gap-x-4 gap-y-8 py-6 lg:px-0 px-4 lg:py-0 '
                        initial='hidden'
                        animate={inView ? 'visible' : 'hidden'}
                        variants={container}
                    >
                        <motion.div variants={fadeInUp} className='rounded  p-4'>
                            <h2 className='text-xl font-medium font-poppins text-gray-700 mb-2'>
                                Telecom Design and Planning
                            </h2>
                            <ul >
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Design/Validation/Surveys</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> MDUs</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Subducting/Roping</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Blown Fibre Cabling</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Overhead Cabling</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Fibre Splicing & Testing</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> EL Joint User Pole installations</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Network Upgrades</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Civil Avoidance</li>
                            </ul>
                        </motion.div>
                        <motion.div variants={fadeInUp} className='rounded  p-4'>
                            <h2 className='text-xl font-medium font-poppins text-gray-700 mb-2'>
                                Utility Civil Engineering
                            </h2>
                            <ul >
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Opencut Trench Duct Laying</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Slip lining</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Main Diversions</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Power Cabinet</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Water Tank base construction</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> EV Charging Stations</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Box & Chamber construction</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Duct Blockage Repairs</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Surface Reinstatement</li>
                            </ul>
                        </motion.div>
                        <motion.div variants={fadeInUp} className='rounded  p-4'>
                            <h2 className='text-xl font-medium font-poppins text-gray-700 mb-2'>
                                Traffic Management
                            </h2>
                            <ul >
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Temporary Multi-Phase Traffic lights</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Pedestrian Signals</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Lane Closures</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> High-speed Traffic Management</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> CAD Drawings</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Bespoken Sign Production</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Road Closures & Diversions</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> Advanced Warning Signs</li>
                                <li className='flex flex-row gap-x-2 text-base font-light text-gray-600 items-start py-1'> <span className='my-1 text-white'>< TbArrowBadgeRightFilled fill='#ff0000' size={15} /></span> TTRO Submissions</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </div >
        </div>
    </>
    );
};

export default Services;