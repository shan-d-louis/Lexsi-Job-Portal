import React, { useState } from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const handleReset = (e) => {
        navigate(`/reset-password/${email}`)
    }

  return (
    <div>
        
    <Navbar/>

        <div className="flex justify-center items-center h-[646px]" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>
            
            {/*Box */}
            <div className="h-[304px] w-[360px] flex flex-col space-y-5 justify-center items-center">
                <span className="text-[#384371] font-bold text-4xl">Forgot Password?</span>

                <p className="text-center text-[#384371] text-md">Enter your E-mail below to receive your password reset instruction</p>

            {/* Credentials */}
            <div className="px-1 h-[65px] w-[360px]">

                <form>
                    <label>
                        E-Mail <br/>
                        <input type="text" onChange={(e) => {setEmail(e.target.value)}} className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                    </label>
                </form>

            </div>

            <button onClick={handleReset} className="bg-[#1967D2] rounded-full px-8 py-2 text-white text-sm cursor-pointer">Next</button>
            
            </div>
        </div>

    <Footer/>
    </div>
  )
}

export default ForgotPassword