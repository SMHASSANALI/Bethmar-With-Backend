import React from 'react';
import Hero from '../components/Hero/Hero.jsx';
import Features from '../components/Features/Features.jsx';
import Services from '../components/Services/Services.jsx';
import Slider from '../components/Slider/Slider.jsx';
import CounterSection from '../components/Counter/Counter.jsx';;
import Benefits from '../components/Benefits/Benefits.jsx';
import Seprator from '../components/Seprator/Seprator.jsx';
import Banner from '../components/Banner/Banner.jsx';
import LocationMap from '../components/LocationMap/MapComponent.jsx';

const Home = () => {
    return (
        <div className='bg-[#f9f9f9]'>
            <div className='relative'>
                <Banner />
                <Hero />
                <Features />
                <Services />
                <Slider />
                <Seprator color={'bg-moving-gradient'} />
                <Benefits />
                <CounterSection />
                <div>
                    <h4 className='lg:text-4xl text-primary mx-auto font-semibold text-2xl xl:text-4xl text-center font-oswald pt-3 pb-3 lg:pt-6 lg:pb-6'>
                        We Are Located At
                    </h4>
                    <LocationMap />
                </div>
            </div>
        </div>
    );
};

export default Home;