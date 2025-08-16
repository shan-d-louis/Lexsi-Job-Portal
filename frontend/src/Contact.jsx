import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Frame from "./assets/Frame.png"
import Phone from "./assets/Phone.png"
import Mail from "./assets/Mail.png"
import Address from "./assets/Address.png"

function Contact() {
  return (
    <>
    <Navbar/>

        <div className='h-[500px] flex flex-col justify-center items-center space-y-10 pb-[200px]' style={{backgroundImage : `url(${Frame})`, backgroundRepeat : "no-repeat"}}>

                <div className='font-[Poppins] flex flex-col space-y-5 justify-center items-center'>
                    <span className='text-2xl font-medium text-[#384371]'>Contact Us</span>
                    <span className='text-4xl font-semibold text-[#1967D2]'>We're Here to Help!</span>
                </div>

                <div className='text-center w-[800px]'>
                    <span className='font-[Poppins] text-sm'>We’d love to hear from you! Whether it’s a query, feedback, or assistance, feel free to connect with us anytime.</span>
                    <br/>
                    <span className='font-[Poppins] text-sm'>Our team is here to assist you every step of the way. Reach out and let us help you!</span>
                </div>

        </div>

        <div className='flex flex-col items-center space-y-10 mb-12'>
                <div className='flex items-center p-10 w-[450px] h-[120px] rounded-4xl border-1 border-gray-300 space-x-10'> 
                        <img src={Phone} className='h-[60px]'/>
                        <div className='font-[Poppins]'>
                            <span className='text-lg font-medium text-[#384371]'>+91 1234567890</span> <br/>
                            <span className='text-sm text-[#384371]'>Available Monday to Friday,</span><br/>
                            <span className='text-sm text-[#384371]'>9 AM - 6 PM</span><br/>        
                        </div>
                </div>

                <div className='flex items-center p-10 w-[450px] h-[120px] rounded-4xl border-1 border-gray-300 space-x-10'> 
                        <img src={Mail} className='h-[60px]'/>
                        <div className='font-[Poppins]'>
                            <span className='text-lg font-medium text-[#384371]'>lexsi.job@gmail.com</span> <br/>
                            <span className='text-sm text-[#384371]'>We will respond within 24 hours on weekdays.</span><br/>                            
                        </div>
                </div>

                <div className='flex items-center p-10 w-[450px] h-[120px] rounded-4xl border-1 border-gray-300 space-x-10'> 
                        <img src={Address} className='h-[60px]'/>
                        <div className='font-[Poppins]'>
                            <span className='text-lg font-medium text-[#384371]'>lexsi Headquarters <br/>1234 Avenue, Suite 567</span>                             
                        </div>
                </div>
        </div>

    
    <Footer/>
    </>
  )
}

export default Contact