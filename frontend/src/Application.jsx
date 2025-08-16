import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from './Navbar'
import Footer from './Footer'
import Clock from "./assets/Clock.png"
import Location from "./assets/Location.png"
import Industry from "./assets/Industry.png"
import Search from "./assets/Search.png"
import Success from "./assets/success.png"
import Review from "./assets/review.png"
import Rejected from "./assets/rejected.png"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Modal, Typography } from '@mui/material'

function Application() {

  const [apps, setApps] =  useState([])
  const [filteredApps, setFilteredApps] = useState([])
  const [search, setSearch] = useState("")
  const [selectedApp, setSelectedApp] = useState({})

  const [open, setOpen] = useState(false)
  const [scoreOpen, setScoreOpen] = useState(false)
  const [hrOpen, setHrOpen] = useState(false) 

  const user_id = localStorage.getItem("userId")
  
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(`http://localhost:3007/view-myapps/${user_id}`)
      .then((res) => {
        setApps(res.data.data)
        setFilteredApps(res.data.data) 
      })
  }, [user_id])

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch(value)

    const filtered = apps.filter((app) => 
      app.job_id.role?.toLowerCase().includes(value) ||
      app.job_id.skills?.toLowerCase().includes(value) ||
      app.job_id.company_id?.name?.toLowerCase().includes(value) ||
      app.job_id.company_id?.district?.toLowerCase().includes(value) ||
      app.job_id.location?.toLowerCase().includes(value) ||
      app.job_id.company_id?.country?.toLowerCase().includes(value)
    )
    setFilteredApps(filtered)
  }

  const fetchAppDetails = (app_id) => {
    axios.post(`http://localhost:3007/find-app/${app_id}`)
      .then((res) => {
        var gmeetLink = res.data.data?.techGmeetLink
        var interviewTime = res.data.data?.techInterviewTime
        var testScore = res.data.data?.testScore || false
        setSelectedApp({gmeetLink : gmeetLink, interviewTime : interviewTime, testScore : testScore})
      })
  }

  const handleTakeTest = (app_id) => {
    setOpen(false)
    navigate(`/test/${app_id}`)
  }

  const fetchHRAppDetails = (app_id) => {
    axios.post(`http://localhost:3007/find-app/${app_id}`)
      .then((res) => {
        var hrInterviewTime = res.data.data?.hrInterviewTime
        var hrGmeetLink = res.data.data?.hrGmeetLink
        setSelectedApp({hrInterviewTime : hrInterviewTime,hrGmeetLink : hrGmeetLink})
      })
  }
  const handleStatus = (app_id, status) => {
      axios.post(`http://localhost:3007/update-status/${app_id}/${status}`)
        .then(()=> {
          props.handleReload();
        })
        .catch((err) => {
          console.log(err)
        });
    };
  return (
    <>
    <Navbar/>

      <div className='flex mx-[50px] my-2 justify-end px-5'>
        <label className='flex bg-gray-50 rounded-4xl p-3 space-x-2 border-gray-300'>
          <img src={Search} className='h-[24px] w-[24px]' alt="Search Icon"/>
          <input 
            className='border-none outline-none' 
            onChange={handleSearch} 
            value={search}
            placeholder='Search Applications here...' 
            type="text"
          />
        </label>
      </div>

      <div className='flex flex-col justify-center items-center space-y-8 my-5 mx-auto w-[1350px] rounded-4xl p-5 shadow-2xl'>
          {filteredApps.map((app, index) => {
            return(
            <div key={index} className='h-[290px] w-[1280px] rounded-4xl flex justify-between items-center bg-[#F0F6FE]'>

                <div className='w-[350px] h-[240px] border-1 border-[#CCCCCC] rounded-4xl flex flex-col justify-center mx-5'>
                    <div className='flex justify-between mx-5'> 
                      <div>
                      <span className='font-[Poppins] font-semibold text-lg text-[#384371]'>{app?.job_id?.role}</span><br/>
                      <span className='text-[#384371] font-[Poppins] text-sm'>{app?.job_id?.skills}</span>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                      <img src={`http://localhost:3007/Upload/${app.job_id.company_id?.logo?.filename}`} alt="Company Logo" className='text-xs h-[50px] w-[50px]'/>
                      <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{app?.job_id?.company_id?.name}</span>
                      </div>
  
                      
                    </div>
  
                    <div className='mx-5 my-5 flex flex-col space-y-3'>
                      <div className='flex space-x-2'>
                        <img src={Location} alt="Location Icon"/>
                        <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{app?.job_id?.location}</span>
                      </div>
  
                      <div className='flex space-x-2'>
                        <img src={Industry} alt="Industry Icon"/>
                        <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{app?.job_id?.industry}</span>
                      </div>
                    </div>
                </div>

                <div className='w-[850px] flex'>
                    <div className='w-[280px] flex flex-col justify-center items-center space-y-3'>
                        <span className='font-semibold font-[Poppins] text-lg text-[#384371]'>Resume</span>
                        <span className='font-medium font-[Poppins] text-sm text-[#384371]'>{app?.DOA?.slice(0,10)}</span>
                        {(app.status === 0) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#FFAE00]'><img className='w-[24px] h-[24px]' src={Review} alt="Review"/> Applied</span>
                        )}

                        {(app.status >= 1 || app.status < -1) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#6BB46E]'><img className='w-[24px] h-[24px]' src={Success} alt="Success"/> Success</span>
                        )}

                        {(app.status === -1) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#FF3D00]'><img className='w-[24px] h-[24px]' src={Rejected} alt="Rejected"/> Rejected</span>
                        )}
                    </div>

                    <div className='w-[280px] flex flex-col justify-center items-center space-y-3'>
                        <span className='font-semibold font-[Poppins] text-lg text-[#384371]'>Technical Interview</span>
                        {(app.status < 2 && app.status >= -1) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[384371]'>Not Scheduled</span>
                        )}

                        {(app.status === 2) && (
                          <>
                          {(app?.techInterviewTime) && (<button onClick={() => {setOpen(true); fetchAppDetails(app?._id)}} className='bg-[#1967D2] p-3 cursor-pointer rounded-full text-sm font-[Poppins] font-medium text-white'>Interview</button>)}
                          
                          {(!app?.techInterviewTime) && (
                              <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[384371]'>Not Scheduled</span>
                            )}

                          <Modal className='flex justify-center items-center' open={open} onClose={() => {setOpen(false)}}>
                            <Box className="bg-white p-12 rounded-3xl text-center">
                              <Typography variant='h4'>Interview Scheduled at</Typography>
                              <Typography className='text-center border-1 rounded-xs my-3 p-1 text-blue-300 border-blue-400'> {new Date(selectedApp?.interviewTime).toLocaleString('en-IN', {dateStyle : "medium", timeStyle : "short"})}</Typography>
                              <br/>
                              <Typography variant='h4'>Meeting Link</Typography>
                              <Typography className='text-center border-1 rounded-xs my-3 p-1 text-blue-300 border-blue-400'> {selectedApp?.gmeetLink}</Typography>
                              <br/>
                              <Button sx={{backgroundColor : "#1967D2", color : "white"}} onClick={(e) => {e.preventDefault(); handleStatus(app?._id, 3); handleTakeTest(app?._id)}}>Take Test</Button>
                            </Box>
                          </Modal>
                          </>
                        )}

                        {(app.status == 3) && (
                          <>
                            <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#FFAE00]'><img className='w-[24px] h-[24px]' src={Review} alt="Review"/> Under Review</span>
                            <button onClick={() => {setScoreOpen(true); fetchAppDetails(app?._id)}} className='bg-[#1967D2] p-2 cursor-pointer rounded-full text-xs font-[Poppins] font-medium text-white'>View Score</button>
                            <Modal className='flex justify-center items-center' open={scoreOpen} onClose={() => {setScoreOpen(false)}}>
                              <Box className="bg-white p-12 rounded-3xl text-center">
                                <Typography variant='h4'>Test Score</Typography><br/>
                                <Typography className='text-center border-1 rounded-xs my-3 p-1 text-blue-300 border-blue-400'>
                                  {selectedApp?.testScore !== false ? selectedApp?.testScore : "Score not available"}
                                </Typography><br/>
                                <Button sx={{backgroundColor : "#1967D2", color : "white"}} onClick={() => setScoreOpen(false)}>Close</Button>
                              </Box>
                            </Modal>
                          </>
                        )}

                        {(app.status > 3 || app.status < -3) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#6BB46E]'><img className='w-[24px] h-[24px]' src={Success} alt="Success"/> Success</span>
                        )}

                        {(app.status === -3) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#FF3D00]'><img className='w-[24px] h-[24px]' src={Rejected} alt="Rejected"/> Rejected</span>
                        )}
                    </div>

                    <div className='w-[280px] flex flex-col justify-center items-center space-y-3'>
                        <span className='font-semibold font-[Poppins] text-lg text-[#384371]'>HR Interview</span>
                        {(app.status < 4 && app.status >= -3) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[384371]'>Not Scheduled</span>
                        )}

                        {(app.status === 4) && (  
                          <>
                            {(app?.hrInterviewTime) && (
                              <button onClick={() => {setHrOpen(true); fetchHRAppDetails(app?._id)}} className='bg-[#1967D2] p-3 cursor-pointer rounded-full text-sm font-[Poppins] font-medium text-white'>Interview</button>
                            )}
                            {(!app?.hrInterviewTime) && (
                              <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[384371]'>Not Scheduled</span>
                            )}

                            <Modal className='flex justify-center items-center' open={hrOpen} onClose={() => {setHrOpen(false)}}>
                              <Box className="bg-white p-12 rounded-3xl text-center">
                                <Typography variant='h4'>HR Interview Scheduled at</Typography>
                                <Typography className='text-center border-1 rounded-xs my-3 p-1 text-blue-300 border-blue-400'>
                                  {selectedApp?.hrInterviewTime ? new Date(selectedApp?.hrInterviewTime).toLocaleString('en-IN', {dateStyle : "medium", timeStyle : "short"}) : "Not Scheduled"}
                                </Typography>
                                <br/>

                                <Typography variant='h4'>Meeting Link</Typography>
                                <Typography className='text-center border-1 rounded-xs my-3 p-1 text-blue-300 border-blue-400'>
                                  {selectedApp?.hrGmeetLink || "No link available"}
                                </Typography>
                                <br/>
                                <Button sx={{backgroundColor : "#1967D2", color : "white"}} onClick={() => setHrOpen(false)}>Close</Button>
                              </Box>
                            </Modal>
                          </>
                        )}

                        {(app.status >= 5 || app.status < -5) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#6BB46E]'><img className='w-[24px] h-[24px]' src={Success} alt="Success"/> Success</span>
                        )}

                        {(app.status === -5) && (
                          <span className='flex items-center justify-center font-[Poppins] font-medium text-sm text-[#FF3D00]'><img className='w-[24px] h-[24px]' src={Rejected} alt="Rejected"/> Rejected</span>
                        )}
                    </div>
                </div>
            </div>
          )})}
      </div>

    <Footer/>
    </>
  )
}

export default Application
