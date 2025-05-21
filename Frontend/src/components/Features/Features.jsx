import React, { useRef } from 'react';
import civil from '../../assets/svg/Civil.svg';
import fibre from '../../assets/svg/Fibre.svg';
import water from '../../assets/svg/Water.svg';
import power from '../../assets/svg/Power.svg';
import {
    motion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink } from 'react-scroll';
import Button from '../Button/Button';
import B from '../../assets/B1.png';
import Background from '../../assets/BG/Background.webp';

import fibreimg from '../../assets/Banner/1.jpg'
import civilimg from '../../assets/Banner/2.jpg'
import waterimg from '../../assets/Banner/4.jpg'
import powerimg from '../../assets/Banner/7.jpg'
import { useState } from 'react';

const HoverCards = ({ image, title, description, svg }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className='h-full w-full flex flex-col max-w-lg relative group lg:min-h-[40vh] cursor-pointer rounded-lg'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isHovered ? "80%" : 0 }}
                transition={{ duration: 0.5, ease: 'easeIn', }}
                className='h-[35vh] overflow-hidden absolute inset-0 z-[-1] transform lg:block hidden rounded-lg'>
                <img src={image} alt="" className='h-auto w-full rounded-lg' />
            </motion.div>
            <div className='bg-neutral-50 h-auto md:min-h-[20vh] lg:min-h-[35vh] p-4 flex flex-col transform group-hover:-translate-y-10 transition-all ease-in rounded'>
                <div className='flex flex-row items-center gap-6'>
                    <div className='w-3/12 md:w-2/12 lg:w-4/12 border-2 border-primary rounded-xl p-2 md:p-4 flex items-center justify-center'>
                        <img src={svg} alt={''} />
                    </div>
                    <h1 className='text-2xl font-semibold px-2 py-6 w-12/12 leading-none text-slate-900'>
                        {title}
                    </h1>
                </div>
                <div className='flex flex-row items-center gap-6'>
                    <p className='text-base font-light px-2 py-0 w-11/12 text-pretty leading-5 pt-4 text-slate-700'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });
    const imgRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: imgRef,
        offset: ["end start", "start end"]
    });

    const y = useTransform(scrollYProgress, [0.1, 0.8], ['300px', '-300px']);
    const rotate = useTransform(scrollYProgress, [0, 0.8], [45, 0]);

    const divStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };



    return (
        <div style={divStyle} id='About' className='flex flex-col items-center justify-center py-12 relative'>
            <div ref={imgRef} className='max-w-[1500px] flex rounded items-center lg:py-6 py-12 relative'>
                <div
                    className='absolute z-10 left-00'>
                    <motion.img
                        src={B}
                        alt=""
                        className='h-[40%] w-[40%] lg:h-[80%] lg:w-[80%] object-cover'
                        style={{ y, rotate }} />
                </div>
                <div ref={ref} className='max-w-[1500px] lg:px-0 px-4 mx-auto relative'>
                    <div className='w-full xl:w-6/12 mx-auto'>
                        <motion.h2
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
                            transition={{ duration: 1, ease: "backIn" }}
                            className=' text-primary mx-auto font-semibold text-2xl xl:text-4xl text-center font-oswald pt-3 pb-3 lg:pt-6 lg:pb-6'>
                            Providing Comprehensive Solutions for Your Infrastructure Needs
                        </motion.h2>
                        <motion.p
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
                            transition={{ duration: 1, ease: "backIn" }}
                            className='z-20 relative text-center pb-0 lg:pb-6 pt-0 lg:pt-2 text-sm lg:text-base font-light font-Poppins my-4 px-1 text-primary-light'>
                            At Bethmar, we specialize in offering a wide range of services to meet your unique requirements. With our expertise and dedication, we deliver top-quality solutions that exceed expectations.
                        </motion.p>
                    </div>
                    <div className='max-w-[1500px] mx-auto gap-y-6 gap-x-3 grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 pt-8 pb-6 z-50 relative'>
                        <HoverCards
                            image={fibreimg}
                            svg={fibre}
                            title="Telecom Turnkey Solutions"
                            description="We provide end-to-end telecom solutions, ensuring seamless connectivity and efficient communication."
                        />
                        <HoverCards
                            image={civilimg}
                            svg={civil}
                            title="Civil Infrastructure Solutions"
                            description="Our civil services encompass a wide range of construction projects, from roads to private projects and utilities."
                        />
                        <HoverCards
                            image={waterimg}
                            svg={water}
                            title="Water Management Services"
                            description="Our expertise include open cut trenches, slip lining, spill tank base builds and much more!"
                        />
                        <HoverCards
                            image={powerimg}
                            svg={power}
                            title="Power Management Solutions"
                            description="We offer EV charging installations, DNO liaison, and comprehensive solar park solutions to support sustainable energy infrastructure."
                        />
                    </div>
                    <div className='flex mx-auto items-center justify-center pt-2'>
                        <ScrollLink
                            to='Services'
                            smooth={true}
                            duration={500}
                            className='cursor-pointer '
                        >
                            <Button text={'Our Services'} color={'black'} />
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
