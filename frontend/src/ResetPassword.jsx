import React, { useEffect, useState } from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ResetPassword() {
    const [passwords, setPasswords] = useState({password : '', confirmPassword : ''})
    const [invalid, setInvalid] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const handleReset = async () => {
        if (passwords?.password != passwords?.confirmPassword) {setInvalid("Passwords Do Not match"); return;}
        const password = passwords?.password
        try {
            const res = await axios.post(`http://localhost:3007/reset-password/${params?.email}`, {password : password})
            console.log(res)
            navigate("/login")
            return;
        } catch (err) {
            setInvalid("User Doesn't Exist. Kindly Login Again with Correct Username or Sign Up")
            console.log(err)}
    }

    const handleInput = (e) => {
        setPasswords({...passwords, [e.target.name] : e.target.value})
    }
    console.log(passwords)
  return (
    <div>
    <Navbar/>

        <div className="flex justify-center items-center h-[646px]" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>
            
            {/*Box */}
            <div className="h-[368px] w-[360px] flex flex-col space-y-5 justify-center items-center">
                <span className="text-[#384371] font-bold text-4xl">Reset Password!</span>
                <br/>
                <p className="text-center text-[#384371] text-md">Enter your new password to reset</p>

                {(invalid) && (
                    <div className='text-center'>
                        <span className='text-red-500'>{invalid}</span>
                    </div>
                )}

            {/* Credentials */}
            <div className="px-1 h-[154px] w-[360px]">

                <form>
                    <label>
                        New Password <br/>
                        <input name="password" onChange={handleInput} type="password" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                    </label>
                    <br/><br/>

                    <label>
                        Confirm Password <br/>
                        <input name="confirmPassword" onChange={handleInput} type="password" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                    </label>
                </form>

            </div>

            <button onClick={handleReset}className="bg-[#1967D2] rounded-full px-8 py-2 text-white text-sm cursor-pointer">Confirm</button>
            
            </div>
        </div>

    <Footer/>
    </div>
  )
}

export default ResetPassword