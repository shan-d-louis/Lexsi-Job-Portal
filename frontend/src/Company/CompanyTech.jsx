import React, { use, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import MakeTech from './MakeTech'
import axios from 'axios'



function CompanyTech() {
    const [tests, setTests] = useState([])
    const [action, setAction] = useState("")
    const [currentTest, setCurrentTest] = useState("")
    const [reload, setReload] = useState(true)

    useEffect(() => {
        const company_id = localStorage.getItem("company_id")

        axios.post(`http://localhost:3007/fetch-tests/${company_id}`)
            .then((res) => {
                setTests(res.data.data.tests)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [reload])

    const handleAction = () => {
        setAction("")
        setReload(!reload)
    }

    console.log(tests[0])
  return (
    <>
    <Navbar/>
        <div className='mx-auto w-[1280px] rounded-xl p-5 my-5 shadow-2xl'>

           {(action == "create") && (<MakeTech sendAction={handleAction} action={action} qsPack={{name : "", qs : [], qsCount : 0 }}/>)}

           {(action == "update") && (<MakeTech sendAction={handleAction} qsPack={currentTest}/>)}

            <div className='flex justify-center flex-wrap gap-6'>
            
            {/* Qs packages */}
            {tests.map((test, index) => {
                return(
                <div key={index}>
                    <button onClick={() => {setAction("update"); setCurrentTest(test)}} className='h-[150px] w-[200px] rounded-2xl bg-blue-50 font-[Poppins] font-medium text-white bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 hover:scale-105 transition-transform duration-300'>{test?.name}</button>
                </div>
                )
            })}
          
            <button onClick={() => {setAction("create"); setCurrentTest("")}} className="h-[150px] w-[200px] rounded-2xl bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 font-[Poppins] font-medium text-white hover:scale-105 transition-transform duration-300">
                <span className="relative z-10">Create Test +</span>
            </button>


            </div>
        </div>
    <Footer/>    
    </>
  )
}

export default CompanyTech