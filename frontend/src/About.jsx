import React from 'react'
import Design1 from "./assets/Design1.png"
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import Vector3 from "./assets/Vector 3.png"
import Vector4 from "./assets/Vector4.png"
import Vector5 from "./assets/Vector 5.png"
import Design2 from "./assets/Design2.png"
import YoungMan from "./assets/youngman.png"
import Teamwork from "./assets/teamwork.jpg"
import Navbar from './Navbar'
import Footer from './Footer'

function About() {
  return (
    <>
    <Navbar/>

        <div className="h-[600px] flex justify-between items-center px-19" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>

            <div className="font-[Poppins] h-[506px] w-[620px]">

                <img src={Design1}/>
                <br/><br/>

                <span className="text-2xl text-[#384371] font-semibold">About Us</span> <br/> <br/>
                <span className="text-4xl font-semibold text-[#1967D2]">“Your Trusted Partner in Career Growth”</span>
                <br/><br/><br/>

                <p className="text-[#384371] text-sm font-semibold">To empower individuals by simplifying the job search process and providing personalized tools to achieve career success, while fostering a reliable and efficient ecosystem for employers and job seekers alike.</p>
                <br/>

                <img src={Design2} className="ms-[300px] mt-[100px]"/>

                
            </div>

            <div className="">
                    <img src={YoungMan} style={{height : "615px", width : "924px"}} className="mt-[-15px]"/>
            </div>
        </div>
    
    <br/><br/>

        <div className='flex justify-center items-center space-x-12 mb-10'>
            
            <div>
            <img src={Design1} className='mb-[-45px] ms-[470px]'/>
            <img src={Teamwork} className='h-[353px] w-[530px] rounded-tl-4xl rounded-br-4xl object-cover'/>
            </div>

            <div className="font-[Poppins] w-[550px] h-[261px]">
                <span className='text-blue-500 font-semibold text-3xl'>Empowering Your Career Journey</span>
                <br/><br/><br/>
                <p className='text-[#384371] text-sm font-semibold'>
                    At Lexsi, we are dedicated to connecting talented individuals with exceptional opportunities. Our platform is designed to simplify job searching by offering personalized recommendations, an intuitive interface, and tools to help you stand out. Whether you're just starting your career or looking to take the next big step, we're here to guide you every step of the way.
                </p>

            </div>
        </div>

        <div style={{backgroundImage : `url(${Vector3})`}} className='h-[600px] pt-[100px] px-[100px] flex justify-between'>
            
            <div className="w-[500px] mt-[-25px] font-[Poppins] text-white ">
                <img src={Vector4}/>
                <br/>
                <span className='text-4xl font-semibold'>Our  Vision</span>
                <br/><br/>
                <p>
                    To become the most trusted platform for connecting job seekers with meaningful opportunities and helping organizations find the talent they need to thrive.
                </p>
            </div>

            <div className="w-[500px] mt-[90px] font-[Poppins] text-white ">        
                <span className='text-4xl font-semibold'>Our  Mission</span>
                <br/><br/>
                <p>
                    To empower individuals by simplifying the job search process and providing personalized tools to achieve career success, while fostering a reliable and efficient ecosystem for employers and job seekers alike.
                </p>
                <div className="flex justify-end mt-[50px]">
                <img src={Vector5}/>
                </div>
            </div>
        </div>

        <div className="px-[90px] font-[Poppins] my-10 text-[#384371] flex flex-col space-y-5">
            <span className='text-4xl font-semibold'>Why Choose Us?</span>
            <br/>

            <div>
            <span className='text-3xl'>1. Personalized Job Matches:</span>
            <br/><br/>
            <span className='text-xl ms-6'>
                We understand your unique skills and career goals, offering tailored recommendations to save you time and effort.
            </span>
            </div>

            <div>
            <span className='text-3xl'>2. Verified Listings:</span>
            <br/><br/>
            <span className='text-xl ms-6'>
                Every job post is carefully screened to ensure reliability and relevance, so you can apply with confidence.
            </span>
            </div>

            <div>
            <span className='text-3xl'>3. Seamless Experience:</span>
            <br/><br/>
            <span className='text-xl ms-6'>
                From an intuitive interface to real-time updates, we make job searching as smooth and efficient as possible.
            </span>
            </div>

            <div>
            <span className='text-3xl'>4. Comprehensive Features:</span>
            <br/><br/>
            <span className='text-xl ms-6'>
                Build your resume, track applications, and receive job alerts—all in one place.
            </span>
            </div>

            <div>
            <span className='text-3xl'>5. Trusted by Thousands:</span>
            <br/><br/>
            <span className='text-xl ms-6'>
                Join a growing community of professionals who've successfully found jobs through our platform.
            </span>
            </div>            
        </div>
    <Footer/>
    </>
  )
}

export default About