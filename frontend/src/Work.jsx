import React from 'react'
import Work1 from "./assets/work1.png"
import Work2 from "./assets/work2.png"
import Work3 from "./assets/work3.png"

function Work() {
  return (
    <>
        <div className="flex justify-center items-center flex-col">
            <div className="font-[Poppins] text-center">
                <span className="font-bold text-4xl text-[#384371]">
                    How it Works
                </span>
                <br/><br/>
                <span className="font-[#384371] text-sm font-semibold">
                    Find the perfect job in just a few steps.
                </span>
            </div>

            <div className="my-[100px] flex justify-center items-center">

                <div className="w-[400px] h-[210px] flex flex-col items-center">
                    <img src={Work1} className="h-[100px]"/>
                    <span className="font-[#384371] font-semibold text-lg">Build Your Profile</span>
                    <br/>
                    <p className="text-[#384371] font-xs text-center font-[Poppins]">
                        Showcase your skills, experience, and career interests to attract the right opportunities.
                    </p>
                </div>

                <div className="w-[400px] h-[210px] flex flex-col items-center">
                    <img src={Work2} className="h-[100px]"/>
                    <span className="font-[#384371] font-semibold text-lg">Search and Apply</span>
                    <br/>
                    <p className="text-[#384371] font-xs text-center font-[Poppins]">
                        Explore personalized job listings tailored to your preferences and apply with a single click.
                    </p>
                </div>

                <div className="w-[400px] h-[210px] flex flex-col items-center">
                    <img src={Work3} className="h-[100px]"/>
                    <span className="font-[#384371] font-semibold text-lg">Apply and Track</span>
                    <br/>
                    <p className="text-[#384371] font-xs text-center font-[Poppins]">
                        Apply to your favorite jobs and monitor the progress of your applications in real time.
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Work