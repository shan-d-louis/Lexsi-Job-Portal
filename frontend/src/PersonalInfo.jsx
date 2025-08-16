import React from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

function PersonalInfo() {

    const navigate = useNavigate();
  return (
    <>
    <Navbar/>

        <div className="flex justify-center items-center h-[666px]" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>

        <div className="h-[311px] w-[744px] flex flex-col justify-center items-center">
            
            <span className="text-[#384371] font-bold text-4xl">Update Personal Info</span>
            <br/>

            <div className="h-[65px] w-[744px] flex justify-between">
                <label>
                    Resume <br/>
                    <input type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                </label>
                <br/><br/>
                <label>
                    Experience <br/>
                    <input type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                </label>
            </div>

            <div className="w-[744px] h-[65px]">
                <label>
                    Skills <br/>
                    <input type="text" className="border-1 border-gray-300 rounded-lg w-[744px] h-[40px]"/>
                </label>
            </div>
            <br/>

            <button onClick={() => {navigate("/home")}}className="bg-[#1967D2] rounded-full px-8 py-2 text-white text-sm cursor-pointer">Confirm</button>
        </div>
        </div>

    <Footer/>
    </>
  )
}

export default PersonalInfo