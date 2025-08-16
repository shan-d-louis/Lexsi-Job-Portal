import React, { useEffect } from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import DefaultProfile from "./assets/DefaultProfile.png"
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

function SignUp() {

    const [signUp, setSignUp] = useState({name : '', email : '', contact : '', password : ''});
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate();

    console.log(signUp)

    useEffect(() => {
        localStorage.clear();
    },[])
    
    const handleInput = (e) => {
        setSignUp({...signUp, [e.target.name]:e.target.value})
    }

    const handleImageUpload = (e) => {
        setSignUp({...signUp, image : e.target.files[0]})
    }

    const handleSignUp = (e) => {
        e.preventDefault()

        //Validation
        if (signUp?.name == ''){setInvalid("Kindly Fill All Required Credentials Before Signing Up"); return;}
        if (signUp?.password != signUp?.confirmPassword) {setInvalid("Passwords Do Not Match"); return;}

        const formData = new FormData()
        formData.append("name", signUp.name);
        formData.append("email", signUp.email);
        formData.append("contact", signUp.contact);
        formData.append("password", signUp.password);
        formData.append("image", signUp.image);



        axios.post("http://localhost:3007/register", formData)
            .then((res) => {
                if (res.data.Msg == "Details saved") {navigate("/login")}
                
            })
            .catch((err) => {
                console.error(err)
            })
    }
    console.log("look", signUp?.password != signUp?.confirmPassword)
    return (
    <>
    <Navbar hide={true}/>

    <div className="flex justify-center items-center h-[822px]" style={{backgroundImage: ` url(${Vector2}), url(${Vector1})`, backgroundSize: "contain, contain", backgroundRepeat : "no-repeat, no-repeat", backgroundPosition : "left bottom, left bottom"}}>
                    
                    {/* Sign Up Box */}
                    <div className="h-[662px] w-[744px] flex flex-col space-y-5 justify-center items-center">
                        <span className="text-[#384371] font-bold text-4xl">Sign Up!</span>
        
                        {/* Add Profile Pic */}
                        <label className="cursor-pointer flex flex-col justify-center items-center">
                            <img src={DefaultProfile}/>
                            <span>+ Add Image</span>
                            <input type="file" className='hidden' onChange={handleImageUpload}/>
                        </label>
                        <br/>

                        {(invalid) && (
                            <>
                                <span className='text-red-500'>{invalid}</span>
                            </>
                        )}

                        {/* Credentials */}
                        <div className="px-1 h-[243px] w-[744px] flex justify-between">
        
                            <div className="h-[243px] w-[360px]">
        
                                <form>
                                    <label>
                                        Name<span className='text-red-600'>*</span> <br/>
                                        <input name="name" onChange={handleInput} type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                                    </label>
                                    <br/><br/>
        
                                    <label>
                                        E-Mail <span className='text-red-600'>*</span> <br/>
                                        <input name="email" onChange={handleInput} type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                                    </label>
                                    <br/><br/>
        
                                    <label>
                                        Phone Number <span className='text-red-600'>*</span><br/>
                                        <input name="contact" onChange={handleInput} type="text" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                                    </label>
                                    <br/>
                                </form>
        
                            </div>
        
                            <div className="h-[243px] w-[360px]">
        
                                <form>
                                    <label>
                                        Enter Password <span className='text-red-600'>*</span> <br/>
                                        <input name="password" onChange={handleInput} type="password" className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                                    </label>
                                    <br/><br/>
        
                                    <label>
                                        Confirm Password <span className='text-red-600'>*</span><br/>
                                        <input type="password" name="confirmPassword" onChange={handleInput} className="border-1 border-gray-300 rounded-lg w-[360px] h-[40px]"/>
                                    </label>
                                </form>
        
                            </div>
                        </div>
        
                        <button onClick={handleSignUp} className="bg-[#1967D2] rounded-full px-8 py-2 text-white text-sm cursor-pointer">Sign Up</button>
                        <span>Already have an account? {}
                            <a href="/login" className="underline hover:text-blue-500">Login</a>
                        </span>
                    </div>
                </div>
    
    <Footer/>
    </>
  )
}

export default SignUp