import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import excavator from '../../assets/BG/excavator.jpg'

const Counter = ({ end, label, sym }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });
    const count = useMotionValue(0);
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        if (inView) {
            controls.start({
                count: end,
                transition: { duration: 2, ease: "easeInOut" },
            });
        }
    }, [controls, inView, end]);

    useEffect(() => {
        const unsubscribe = count.on("change", (v) => {
            setDisplayCount(Math.round(v));
            return () => {
                unsubscribe();
            };
        })
    }, [count]);

    return (
        <div className="text-center md:pt-6">
            <motion.div
                ref={ref}
                className="text-xl lg:text-3xl font-bold text-center font-poppins bg-clip-text text-transparent bg-gradient-to-t from-accentRed-dark to-accentRed-light"
                initial={{ count: 0 }}
                animate={controls}
                style={{ count }}
            >
                {displayCount}
                <span className='ml-1'>{sym}</span>
            </motion.div>
            <p className="text-xs lg:text-base font-medium text-white">{label}</p>
        </div>
    );
};

const CounterSection = () => {
    const counters = [
        { end: 261, sym: "+", label: 'Projects Completed' },
        { end: 100, sym: "%", label: 'Satisfied Customers' },
        { end: 25, sym: "+", label: 'Years of Experience' },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const divStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${excavator})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <div className='flex justify-center items-center bg-gradient-to-tr w-full mb-12'>
            <div className='py-2 overflow-hidden lg:mx-0 mx-4'>
                <div className='flex justify-center items-center relative'>
                    <motion.div
                        className="absolute w-[150vw] h-[28.5vh] z-10 animate-rotate-gradient"
                        style={{
                            background: 'radial-gradient(circle, #6d0a08 100%, #6d0a08 100%)',
                        }}
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 15,
                            ease: "linear",
                        }}
                    ></motion.div>
                    <motion.div
                        className="flex items-center  relative z-20"
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div style={divStyle} className="w-full mx-auto p-8">
                            <h2 className="mx-auto font-semibold text-2xl lg:text-4xl text-center text-white font-oswald pb-4">
                                Delivering Exceptional Results with Our Expert Infrastructure Construction Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-poppins">
                                {counters.map((counter, index) => (
                                    <Counter key={index} sym={counter.sym} end={counter.end} label={counter.label} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
};

export default CounterSection;
