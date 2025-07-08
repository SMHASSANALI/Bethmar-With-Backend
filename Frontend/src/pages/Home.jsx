import React, { useContext, useState, useEffect } from 'react'
import Hero from '../components/Hero/Hero.jsx'
import Features from '../components/Features/Features.jsx'
import Services from '../components/Services/Services.jsx'
import Slider from '../components/Slider/Slider.jsx'
import CounterSection from '../components/Counter/Counter.jsx'
import Benefits from '../components/Benefits/Benefits.jsx'
import Seprator from '../components/Seprator/Seprator.jsx'
import Banner from '../components/Banner/Banner.jsx'
import LocationMap from '../components/LocationMap/MapComponent.jsx'
import GetContext from '../context/Custom Get Context/Get.Context.js'

const Home = () => {
  const { getDataFromAPI } = useContext(GetContext)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {
    ;(async () => {
      const data = await getDataFromAPI('home-page/get-home-section')
      if (data) {
        setData(data)
      }
    })()
  }, [])
  console.log(data)
  return (
    <div className='bg-[#f9f9f9]'>
      <div className='relative'>
        <Banner image={data?.image} description={data?.description} />
        <Hero />
        <Features data={data?.about} />
        <Services services={data?.services} />
        <Slider data={data?.clients} />
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
  )
}

export default Home
