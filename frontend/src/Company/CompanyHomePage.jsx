import React, { useEffect, useState } from 'react'
import Vector1 from "../assets/Vector 1.png"
import Vector2 from "../assets/Vector 2.png"
import HomePageLady from "../assets/HomePage Lady.png"
import Award from "../assets/Award.png"
import Like from "../assets/Like.png"
import Verified from "../assets/Verified.png"
import JobsDone from "../assets/Jobs done.png"
import Phone from "../assets/Phone.png"
import Mail from "../assets/Mail.png"
import Navbar from '../Navbar'
import Footer from '../Footer'
import Work from '../Work'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function CompanyHomePage() {

    const [profile, setProfile] = useState({})
    const [company_id, setId] = useState("")
    const navigate = useNavigate()
    

    useEffect(() => {
        const user_id = localStorage.getItem("userId");
        axios.post(`http://localhost:3007/find-company/${user_id}`)
            .then((res) => {
                const companyProfile = res.data.data[0]
                setProfile(companyProfile)
                setId(companyProfile?._id)
                console.log(1)
            })
            .catch((err) => {
                console.log(err)
            })
        
    }, [] );

    useEffect(() => {
        localStorage.setItem("company_id", company_id)
        console.log(2)
    }, [company_id])

    console.log(profile)
    console.log(company_id)
    
  return (
    <>
    <Navbar/> 

        {/* HERO Section */}
        <div className="h-[649px] flex justify-between items-center px-19" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>

            <div className="font-[Poppins] h-[506px] w-[620px]">

                <div className="border-1 text-[#384371] font-[Poppins] h-[55px] w-[276px] rounded-4xl border-[#1967D2B2] justify-center flex items-center">
                    ⭐ Your Career Starts Here!
                </div>
                <br/><br/>

                <span className="text-7xl font-semibold">Find Your Dream</span> <br/> <br/>
                <span className="text-7xl font-semibold text-[#1967D2]">Job Today</span>
                <br/><br/><br/>

                <p className="text-[#384371] text-sm font-semibold">Explore thousands of job opportunities from trusted employers. Whether you're starting your journey or looking for the next big step, we've got you covered.</p>
                <br/><br/>

                <button className="bg-[#1967D2] rounded-full  py-2 px-5 text-white text-xl cursor-pointer">Apply Now →</button>
                <button className="rounded-full  py-2 px-5 text-xl cursor-pointer">Learn More →</button>
            </div>

            <div className="h-[649px] w-[649px] bg-radial rounded-full from-blue-700 via-blue-200">
                    <img src={HomePageLady} className="me-[143px] mt-[-285px]"/>

                    <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl mt-[-600px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
                        <img src={Award} className="bg-blue-600 rounded-full p-2 h-[40px]"/>
                        <span>Fast, Easy, and Free to Register!</span>
                    </div>

                    <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl ms-[430px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
                        <img src={Like} className="bg-blue-600 rounded-full p-2 h-[40px]"/>
                        <span>Trusted by Thousands of Job Seekers!</span>
                    </div>
                    
                    <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl mt-[220px] ms-[-110px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
                        <img src={Verified} className="bg-blue-600 rounded-full p-2 h-[40px]"/>
                        <span>Search Thousands of Verified Listings!</span>
                    </div>

                    <div className="w-[167px] h-[89px] ms-[480px]">
                        <img src={JobsDone}/>
                    </div>
  
            </div>
        </div>
        <div className="flex justify-center mt-[-50px]">
        <button className="h-[100px] w-[400px]  rounded-full bg-gradient-to-b from-blue-400 to-blue-700 shadow-2xl cursor-pointer font-bold text-3xl text-center text-yellow-500 font-[Poppins]">
            <span>Enhance Your Career</span>
        </button>
        </div>

        {/* Profile */}

        <div className="flex justify-center">
        <div className="w-[1000px] h-[283px] ms-5 my-[100px] rounded-3xl flex items-center ps-[100px] space-x-[75px] bg-[#1967D2]">
            <label className='text-center text-white font-[Poppins] text-3xl font-semibold'>
                <img src={`http://localhost:3007/Upload/${profile?.logo?.filename}`} className='border-2 border-white h-[180px] w-[180px] rounded-full'/>
                Profile
            </label>

            <div className='text-center w-[225px] flex flex-col space-y-10'>
            <span className='text-4xl font-[Poppins] text-white font-semibold'>{profile.name}</span>

            <div className='font-[Poppins] ps-5 '>
                <div className='flex items-center space-x-2'><img src={Mail} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.user_id?.email}</span></div>
                <br/>
                <div className='flex items-center space-x-2'><img src={Phone} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.user_id?.contact}</span></div>
            </div>
            </div>
            
            <div className='border-l-1 h-[200px] flex flex-col   justify-center border-white ms-12 ps-12 space-y-12'>
            <Link to="/company/profile" className='rounded-full bg-amber-400 p-3 text-white text-center font-[Poppins] font-medium border-2 border-white'>Update Profile</Link>
            <Link to="/company/applications" className='rounded-full bg-amber-400 p-3 text-white text-center font-[Poppins] font-medium border-2 border-white'>View Applications</Link>
            </div>
          
        </div>
        </div>
    

    <Work/>
    
    <Footer/>        
    </>
  )
}

export default CompanyHomePage