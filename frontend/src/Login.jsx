import React, { useEffect } from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {

    const navigate = useNavigate();
    const [login, setLogin] = useState({email : '', password : ''});
    const [invalid, setInvalid] = useState(false)
    console.log(login)

    useEffect(() => {
        localStorage.clear();
    },[])

    const handleInput = (e) => {
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3007/login", login)
            .then((res) => {
                console.log("result:", res)
                if (res.data.msg == "User Login Successful") {localStorage.setItem("group", "user"); navigate("/home")}
                if (res.data.msg == "Company Login Successful") {localStorage.setItem("group", "company"); navigate("/company/home")}
                if (res.data.msg == "Admin Login Successful") {localStorage.setItem("group", "admin"); navigate("/admin")}
                if (res.data.msg == "Invalid e-mail or password. Please try again") 
                    {setInvalid(true)}
                else {
                    localStorage.setItem("userId", res.data.id)
                }

            })
            .catch ((err) => {
                console.error(err)

            })
        

    }

  return (
    <>
    <Navbar hide={true}/>

        <div className="flex justify-center items-center h-[646px]" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>
            
            {/* Sign Up Box */}
            <div className="h-[370px] w-[360px] flex flex-col space-y-5 justify-center items-center">
                <span className="text-[#384371] font-bold text-4xl">Login!</span>

            {/* Credentials */}
            <div className="px-1 h-[168px] w-[360px] flex flex-col justify-center">
                {(invalid && (
                    <>
                    <span className="text-red-600">Invalid e-mail or password. Please try again</span>
                    </>
                ))}
                <form>
                    <label>
                        Username <span className='text-red-600'>*</span> <br/>
                        <input name="email" onChange={handleInput} type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                    </label>
                    <br/><br/>

                    <label>
                        Password <span className='text-red-600'>*</span> <br/>
                        <input name="password" onChange={handleInput} type="password" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                    </label>
                </form>
                <a onClick={() => {navigate("/forgot-password")}} className="cursor-pointer text-end hover:text-blue-500 text-gray-600">Forgot Password?</a>

            </div>

            <button onClick={handleLogin} className="bg-[#1967D2] rounded-full px-8 py-2 text-white text-sm cursor-pointer">Login</button>
            <span>Don't have an account? {}
                <a href="/" className="underline hover:text-blue-500">Sign Up</a>
            </span>
            </div>
        </div>

    <Footer/>
    </>
  )
}

export default Login


        