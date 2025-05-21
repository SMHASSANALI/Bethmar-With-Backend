import React, { useState, useEffect } from 'react'
import bannerImg from '../../assets/Banner/BannerImage.jpg'
import { motion } from 'framer-motion'
import ContactForm from '../ContactForm/ContactForm';

const slides = [
    "Transforming infrastructure. Enhancing Lives.",
    "Building a brighter future with cutting-edge solutions.",
    "Innovation and excellence in every project we undertake."
];

const Banner = () => {
    const divStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const [formVisible, setFormVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        setFormVisible(!formVisible);
    };

    const slideVariants = {
        initial: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 },
    };

    return (
        <section style={divStyle} className='flex items-center h-[35vh] md:h-[40vh] lg:h-[70vh] w-full'>
            <div id='Banner' className='max-w-[1500px] md:ml-auto flex-row px-4 sm:w-full md:w-6/12'>
                <div className='p-2 md:py-8 md:px-12 bg-primary bg-opacity-60 backdrop-blur-sm rounded-lg relative md:top-0 top-[-50px] overflow-hidden'>
                    <motion.div
                        key={currentSlide}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className='text-2xl lg:text-4xl font-semibold lg:text-left text-center text-white tracking-wider leading-normal font-oswald max-w-2xl'
                    >
                        {slides[currentSlide]}
                    </motion.div>
                </div>
            </div>
            {formVisible && (
                <ContactForm onClose={handleClick} />
            )}
        </section>
    );
};

export default Banner;