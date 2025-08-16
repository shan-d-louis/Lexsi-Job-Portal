import React from 'react'
import Star from "./assets/Star 1.png"

function Footer() {
  return (
    <div className="bg-[#293460] h-[298px] flex flex-col justify-center items-center">

        <div className="w-[1280px] h-[160px] flex justify-between">

            {/* Left Box */}
            <div className="w-[372px] h-[160px]">

                <div className="flex"> 
                    <img src={Star} className="h-12 w-12" alt="Logo"/>
                    <span className="ms-3 text-5xl font-semibold text-white">Lexsi</span>
                </div>
                <br/><br/><br/>
                <span className="text-sm text-white">Start your journey to success by exploring roles from top companies today!</span>

            </div>

            {/* Right Box */}
            <div className="text-white w-[58px] h-[160px] text-end p-2">
                <ul className="flex flex-col space-y-3">
                    <li><a href="" className="text-sm">Home</a></li>
                    <li><a href="" className="text-sm">Jobs</a></li>
                    <li><a href="" className="text-sm">About</a></li>
                    <li><a href="" className="text-sm">Contact</a></li>
                </ul>
            </div>
        </div>
        
        <br/>

        <div className="border-1 border-white w-[1280px]">

        </div>

        <br/>

        <div className="text-white w-[1280px] h-[25px] flex justify-between">

            <span>Copy right © 2025. All rights reserved</span>

            <div className="flex space-x-10">
                <a href="">Terms & Conditions</a>
                <a href="">Privacy Policy</a>
            </div>

        </div>
        
    </div>
  )
}

export default Footer