import React from 'react'
import Profile from './Profile'
import Navbar from './Navbar'
import Footer from './Footer'

function ViewProfile() {
  return (
    <>
        <Navbar/>
        <div className='flex justify-center items-center mb-[-75px] mt-[25px]'>
            <span className='font-[Poppins] font-semibold text-4xl'>Click to Edit</span>
        </div>
        <Profile color="#C8CCCF" edit={true}/>
        <Footer/>
    </>
  )
}

export default ViewProfile