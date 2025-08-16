import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Clock from "./assets/Clock.png"
import Location from "./assets/Location.png"
import Industry from "./assets/Industry.png"
import Deadline from "./assets/Deadline.png"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'

function ApplyJob() {
    const [job, setJob] = useState()
    const [resume, setResume] = useState(null)
    const [invalid, setInvalid] = useState(false)

    const [openSuccess, setOpenSuccess] = useState(false)

    const params = useParams()
    const navigate = useNavigate()
    const job_id = params.job_id
    const user_id = localStorage.getItem("userId")
    console.log(job_id)
    console.log(params)

    useEffect(() => {
        axios.post(`http://localhost:3007/find-job/${job_id}`)
            .then((result) => {
                setJob(result.data.data[0])
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    const handleResume = (e) => {
        setResume(e.target.files[0])
    }

    const handleApply = (e) => {
        e.preventDefault()

        if(resume === null){setInvalid("Kindly Upload your Resume before Applying"); return;}

        const formData = new FormData()
        formData.append("resume", resume)

        axios.post(`http://localhost:3007/apply-job/${user_id}/${job_id}`, formData)
            .then((res) => {
                setOpenSuccess(true)
        })
    }
    console.log("job",job)
    console.log("resume", resume)
  return (
    <>
    <Navbar/>
        <div className='mx-auto flex flex-col justify-center items-center space-y-5 my-10'>

            <div className='w-[1280px] h-[220px] bg-[#F0F6FE] flex justify-between items-center px-[100px] rounded-4xl'>
                <div>
                    <span className='font-[Poppins] text-[#384371] font-semibold text-4xl'>{job?.role}</span><br/><br/>
                    <span className='font-[Poppins] text-[#384371] text-lg font-medium'>{job?.skills}</span>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <span className='font-[Poppins] text-[#384371] text-lg font-medium'>Your next big opportunity is just a click away!</span><br/>
                    <label className='flex flex-col items-center'>
                        <input onChange={handleResume} type="file" id="resume" className='border-1 rounded-full text-[#F0F6FE] w-6'/>
                        <span className='font-[Poppins] text-sm text-[#384371] font-medium border-1 rounded-3xl px-3'>Upload Resume</span>
                    </label>
                </div>

                <div>
                    <label className='flex flex-col items-center'>
                        <img className='w-[125px] h-[125px] rounded-2xl' src={`http://localhost:3007/Upload/${job?.company_id?.logo?.filename}`}/>
                        {job?.company_id?.name}
                    </label>
                </div>
            </div>

            <div className='w-[1280px] flex mx-auto justify-center items-center'>
                <div className='w-[400px] min-h-[700px] bg-[#F0F6FE] rounded-4xl'>
                    <div className='font-[Poppins] p-10 flex flex-col space-y-7'>
                        <span className='text-lg font-semibold text-[#384371]'>Job Overview</span>

                        <div className='flex space-x-3'>
                            <img src={Location} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Location</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.location}</span>
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <img src={Clock} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Date Posted</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.datePosted?.slice(0,10)}</span>
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <img src={Deadline} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Deadline</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.deadline?.slice(0,10)}</span>
                            </div>
                        </div>

                    </div>

                    <div className='font-[Poppins] p-10 flex flex-col space-y-7'>
                        <span className='text-lg font-semibold text-[#384371]'>Job Info</span>

                        <div className='flex space-x-3'>
                            <img src={Location} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Experience</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.experience}</span>
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <img src={Clock} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Date Posted</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.salary}</span>
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <img src={Deadline} className='h-[24px] w-[24px]'/>
                            <div className='font-[Poppins]'>
                                <span className='font-medium text-xs text-[#1967D2]'>Deadline</span><br/>
                                <span className='font-medium mt-3 text-sm text-[#384371]'>{job?.jobType}</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-[840px] min-h-[700px] flex flex-col ps-7 space-y-5 pt-5'>
                    <span className='font-[Poppins] text-[#384371] text-lg font-semibold'>Description</span>
                    <p className='font-[Poppins] text-[#384371] text-sm font-medium'>{job?.company_id?.desc}</p>

                    <span className='font-[Poppins] text-[#384371] text-lg font-semibold'>Responsibilities</span>
                    <span className='font-[Poppins] text-[#384371] text-sm font-medium'>{job?.responsibilities.split('.').map((line, index) => {return (<div key={index+1}>{line}<br/></div>)})}</span>

                    <span className='font-[Poppins] text-[#384371] text-lg font-semibold'>Required Skills</span>
                    <span className='font-[Poppins] text-[#384371] text-sm font-medium'>{job?.requirements.split('.').map((line, index) => {return (<div key={index+1}>{line}<br/></div>)})}</span>

                    {(invalid) && (<span className='text-red-500 font-[Poppins]'>{invalid}</span>)}
                    <button onClick={handleApply} className='w-[250px] mx-auto p-5 text-white border-1 border-white rounded-4xl bg-[#1967D2] font-[Poppins] text-sm font-medium'>Upload Resume & Apply!</button>
                </div>
            </div>

        </div>

        <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)} PaperProps={{style: { borderRadius: 20, padding: "20px", textAlign: "center" }}}>
            <DialogTitle>
                <CelebrationIcon style={{ fontSize: 50, color: "#ff9800" }} />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold", color: "#1967D2" }}>
                    Applied Successfully!
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ color: "#384371", fontFamily: "Poppins" }}>
                    Your application has been submitted. View your application status to keep track of it.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" sx={{ backgroundColor: "#1967D2", borderRadius: "20px", px: 4 }} onClick={() => {setOpenSuccess(false); navigate("/application")}}>View Applications</Button>
            </DialogActions>
        </Dialog>

    <Footer/>
    </>
  )
}

export default ApplyJob