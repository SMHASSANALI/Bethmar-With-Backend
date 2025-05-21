import React, { useState } from 'react'
import contact from '../../assets/contact/fiberRoll.jpg'
import { motion } from 'framer-motion';
import ContactForm from '../ContactForm/ContactForm';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';


const CTA = () => {
    const divStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contact})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const [formVisible, setFormVisible] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const buttonVariants = {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 100 },
    };

    const handleClick = () => {
        setFormVisible(!formVisible);
    };


    return (
        <div style={divStyle} className='bg-fixed relative flex items-center top-[-10vh] w-full left-0 lg:h-[80vh] h-[60vh]'>
            <div ref={ref} className='mx-auto text-white'>
                <h2 className='mx-auto text-center mb-4 lg:mb-8 tracking-wide leading-tight font-oswald text-2xl lg:text-4xl font-semibold text-white'>Transforming Infrastructure with Innovative Solutions</h2>
                <p className='text-center pb-2 lg:pb-4 text-sm lg:text-base font-light font-Poppins my-4 px-1 text-slate-100'>Contact Bethmar today for a consultation or quote on our comprehensive range of services.</p>
                <div className='flex justify-center'>
                    <ScrollLink
                        to='Footer'
                        onClick={handleClick}
                        smooth={true}
                        duration={500}
                        className='cursor-pointer'
                    >
                        <motion.button
                            className="text-base group relative py-2 px-4 font-medium transition-all duration-[400ms] font-montserrat bg-accentRed-dark text-white shadow-md hover:bg-accentRed transform hover:scale-105"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={buttonVariants}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Reach The Experts
                        </motion.button>
                    </ScrollLink>
                </div>
            </div>
            {formVisible && (
                <ContactForm onClose={handleClick} />
            )}
        </div>
    )
}

export default CTA