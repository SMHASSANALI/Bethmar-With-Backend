import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import 'swiper/css/pagination';
import connect from '../../assets/customer/connect.png';
import gigaclear from '../../assets/customer/gigaclear.png';
import gNetwork from '../../assets/customer/gNetwork.png';
import Kier from '../../assets/customer/Kier.png';
import amey from '../../assets/customer/amey.png';
import telent from '../../assets/customer/telent.png';
import openreach from '../../assets/customer/openreach.png';
import AffinityWater from '../../assets/customer/AffinityWater.png';
import Virgin from '../../assets/customer/Virgin.png';
import { Autoplay, Pagination } from "swiper/modules";
import { useInView } from "react-intersection-observer";

const Slider = () => {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

    const customers = [
        { img: connect },
        { img: gigaclear },
        { img: gNetwork },
        { img: Kier },
        { img: Virgin },
        { img: amey },
        { img: openreach },
        { img: AffinityWater },
        { img: telent },
    ];

    return (
        <div ref={ref} className="flex items-center justify-center">
            <div className='container text-justify w-full mx-auto content-center'>
                <div className='max-w-[1500px] mx-auto'>
                    <motion.h2
                        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className='lg:text-4xl text-primary mx-auto font-semibold text-2xl xl:text-4xl text-center font-oswald pt-3 pb-3 lg:pt-6 lg:pb-6'>Meet Our Clients</motion.h2>
                    <motion.div
                        animate={{ y: inView ? 1 : 200, opacity: inView ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 }
                            }}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false
                            }}
                            className='swiper-container mx-4 lg:mx-0 '
                        >
                            {customers.map((customer, index) => (
                                <SwiperSlide key={index}>
                                    <motion.div
                                        className='flex flex-col items-center justify-center p-6 rounded-lg shadow-md cursor-pointer bg-gradient-to-br from-[#edf7e3] to-[#fce9e9]'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.img
                                            src={customer.img}
                                            alt={customer.text}
                                            className='w-auto h-20 md:w-auto md:h-24 object-cover object-center mx-auto mb-4'
                                            whileHover={{ rotate: 10 }}
                                        />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
