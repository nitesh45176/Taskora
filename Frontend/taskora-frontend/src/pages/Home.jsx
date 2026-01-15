import React from 'react'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import WhyTaskora from '../components/home/WhyTaskora'
import Safety from '../components/home/Safety'
import WhoIsItFor from '../components/home/WhoIsItFor'
import PopularTasks from '../components/home/PopularTasks'
import RunnerEarnings from '../components/home/RunnerEarnings'
import CTA from '../components/home/CTA'

const Home = () => {
  return (
    <div >
        <Hero/>
        <WhyTaskora/>
        <HowItWorks/>
        <Safety/>
        <WhoIsItFor/>
        <PopularTasks/>
        <RunnerEarnings/>
        <CTA/>
    </div>
  )
}

export default Home