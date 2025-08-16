import React, { useEffect, useState } from 'react'
import Remove from "../assets/remove.png"
import axios from 'axios'

function MakeTech(props) {
    const [test, setTest] = useState(props.qsPack)
    const [invalid, setInvalid] = useState(false)
    const [reload, setReload] = useState(true)
    const [company_id, setId] = useState("")

    useEffect(() => {
        const company_id = localStorage.getItem("company_id")
        setId(company_id)
    }, [])

    const handleTestInput = (field, value) => {
        setTest({...test, [field] : value})
    }

    const handleQsInput = (index, field, value) => {
        var newQs = test?.qs
        newQs[index] = {...test?.qs[index], [field] : value}
        setTest({...test, qs : newQs})        
    }

    const addQs = () => {
        var newQs = [...test?.qs, {question : "", answer : "", wrongOptions1 : "", wrongOptions2 : "", wrongOptions3 : ""}]
        var newCount = newQs?.length;
        setTest({...test, qs : newQs, qsCount : newCount})
    }

    const removeQs = (index) => {
        var newQs = [...test?.qs]
        newQs.splice(index, 1)
        var newCount = newQs?.length;
        setTest({...test, qs : newQs, qsCount : newCount})
    }

    const handleSubmit = () => {
        if (test?.qsCount < 5) {setInvalid("Minimum 5 questions required"); return;}
        if (test?.qsCount > 25) {setInvalid("Maximum 25 questions allowed"); return;}
     
        setInvalid(false)
        console.log(company_id)
        var questions = []

        if (props.action == "create"){
            axios.post(`http://localhost:3007/add-test/${company_id}`, test)
                .then((res) => {
                    props.sendAction()
                })
                .catch((err) => {
                    console.log(err)
                })
            }

        else {
            axios.post(`http://localhost:3007/update-tests/${company_id}`, test)
                .then((res) => {
                    props.sendAction()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        
    }

    console.log(props)
  return (
    <>

        <div className='flex flex-col space-y-5 mx-auto w-[1200px] rounded-xl p-5 my-5 border-1 border-gray-100' >
            <input type="text" placeholder='Name of Test...' value={test?.name || ""} onChange={(e) => {handleTestInput("name", e.target.value)}} className='border-1 w-[200px] font-[Poppins] ps-1 rounded-lg text-blue-600 font-medium border-black'/>

            {(invalid) && (
                <>
                <span className='text-red-500 ms-5 font-medium'>{invalid}</span>
                </>
            )}
            {(test?.qsCount > 0) && (
                <>
                    <div className='flex flex-col space-y-8 mx-auto w-[1120px] rounded-xl p-5 border-1 border-gray-400'>
                        {test?.qs?.map((q, index) => {return(
                            <div key={index} className='flex flex-col justify-start space-y-3 border p-5'>
                                <div className='flex items-center'>
                                    <span className='font-[Poppins]  text-blue-300'>{String(index + 1) + ") "} </span><input className='ps-1 ms-1 text-blue-300 w-[980px] h-[40px] rounded-xs font-[Poppins] border-1 border-blue-200' type="text" placeholder="Question..." value={q.question || ""} onChange={(e) => {handleQsInput(index,"question",e.target.value)}}/>
                                    <button onClick={() => {removeQs(index)}} className='rounded-full cursor-pointer border-1 border-blue-400 ms-5'><img src={Remove}/></button>
                                </div>
                        

                                <input className='ps-1 p-5 ms-5 w-[200px] h-[25px] rounded-full font-[Poppins] text-green-500 border-green-400 border-1' type="text" placeholder="Correct Answer..." value={q.answer || ""} onChange={(e) => {handleQsInput(index,"answer",e.target.value)}}/>
                                <div className='flex space-x-3'>
                                    <input className='ps-1 p-5 ms-5 w-[200px] h-[25px] rounded-full font-[Poppins] text-red-700 border-red-500 border-1' type="text" placeholder="Wrong Answer 1..." value={q.wrongOptions1 || ""} onChange={(e) => {handleQsInput(index,"wrongOptions1",e.target.value)}}/>
                                    <input className='ps-1 p-5 ms-5 w-[200px] h-[25px] rounded-full font-[Poppins] text-red-700 border-red-500 border-1' type="text" placeholder="Wrong Answer 2..." value={q.wrongOptions2 || ""} onChange={(e) => {handleQsInput(index,"wrongOptions2",e.target.value)}}/>
                                    <input className='ps-1 p-5 ms-5 w-[200px] h-[25px] rounded-full font-[Poppins] text-red-700 border-red-500 border-1' type="text" placeholder="Wrong Answer 3..." value={q.wrongOptions3 || ""} onChange={(e) => {handleQsInput(index,"wrongOptions3",e.target.value)}}/>
                                </div>
                            </div>                            
                        )})}
                    </div>
                </>
            )}
            
            <input type="number" placeholder='Time Limit in Minutes...' value={test?.timeLimit || ''} onChange={(e) => {handleTestInput("timeLimit", e.target.value)}} className='border-1 w-[200px] font-[Poppins] ps-1 rounded-lg text-blue-600 font-medium border-black'/>
            
            <button onClick={addQs} className='w-[125px] p-1 cursor-pointer text-white border-1 border-white rounded-xl bg-[#1967D2] font-[Poppins] text-sm font-medium'>Add Question</button>

            <button onClick={handleSubmit} className='py-3 ms-[1040px] w-[125px] cursor-pointer text-white border-1 border-white rounded-4xl bg-[#1967D2] font-[Poppins] text-lg font-medium'>Save Test</button>
        </div>
    
        
    </>
  )
}

export default MakeTech