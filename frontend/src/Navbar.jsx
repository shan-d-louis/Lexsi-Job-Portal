import React, { useEffect, useState } from 'react'
import axios from "axios"
import Star from "./assets/Star 1.png";
import Logout from "./assets/logout.png"
import UserProfile from "./assets/UserProfile.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

function Navbar(props) {

    const [login, setLogin] = useState(false);
    const [profile, setProfile] = useState({});
    const [group, setGroup] = useState("user")
    const [company, setCompany] = useState({})

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        try {
        const user_id = localStorage.getItem("userId")
        const grp = localStorage.getItem("group")

        if (user_id){
            axios.post(`http://localhost:3007/find-user/${user_id}`)
                .then((res) => {
                    if (props.hide) {setLogin(false)}
                    else {setLogin(true)}
                    setGroup(grp)
                    setProfile(res.data.data[0])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    } catch(err) {
        console.log(err)
    }},[])

    useEffect(() => {
    if (group == "company") {
        axios.post(`http://localhost:3007/find-company/${profile?._id}`)
                .then((res) => {
                    const companyData = res.data.data[0]
                    setCompany(companyData)
                })
                .catch((err) => {
                    console.log(err)
                })} 
    }, [profile])

    const handleNavigateProfile = () => {
        if (group == "user") navigate("/profile");
        if (group == "company") {localStorage.setItem("company_id", company?._id); navigate("/company/profile")}
    }
    

  return (
    <div>
        <div className="px-9 py-5">
            <div className="justify-between items-center flex mx-6">

            {/* Navbar-brand */}
            <Link className="flex items-center" to="/home">
                <img src={Star} className="h-7 w-7" alt="Logo"/>
                
                <span className="ms-3 text-2xl font-semibold text-[#384371]">Lexsi</span>
            </Link>

            {/* Navbar-list */}
            

            {/* User */}
            {(group == "user") && (
                <>
                    <ul className="hidden sm:flex space-x-10" style={{zIndex : 5}}>
                        <li><Link className="text-xl cursor-pointer" to="/home" >Home</Link></li>
                        <li><Link className="text-xl cursor-pointer" to="/jobs">Jobs</Link></li>
                        <li><Link className='text-xl cursor-pointer' to="/application">Application Status</Link></li>
                        <li><Link className="text-xl cursor-pointer" to="/about">About</Link></li>
                        <li><Link className="text-xl cursor-pointer" to="/contact">Contact</Link></li>
                    </ul>
                </>
            )}

            {/* Company */}
            {(group == "company") && (
                <>
                    <ul className='sm: flex space-x-10' style={{zIndex : 2}}>
                        <li><Link className='text-xl cursor-pointer' to="/company/home">Home</Link></li>
                        <li><Link className='text-xl cursor-pointer' to="/company/job">Job</Link></li>
                        <li><Link className='text-xl cursor-pointer' to="/company/applications">Applications</Link></li> 
                        <li><Link className='text-xl cursor-pointer' to="/company/tech">Technical Interview</Link></li>        
                    </ul>
                </>
            )}

            

            {/* Login/Profile */}
            
            {!(login) && (
                <>
                <Link style={{zIndex : 2}} className="bg-[#1967D2] rounded-full  py-2 px-5 text-white text-xl cursor-pointer" to="/login">Login →</Link>
                </>
            )}

            {(login) && (
                <>
                <div className="space-x-6 flex">

                <div className="flex space-x-3 items-center">
                <span style={{zIndex : 5}} onClick={handleNavigateProfile} className="cursor-pointer text-xl">Hi, {profile.name}</span>
                {(group == "user") && (<><button style={{zIndex : 10}} onClick={handleNavigateProfile} className="cursor-pointer"><img src={`http://localhost:3007/Upload/${profile.image?.filename}`} className="rounded-full h-[24px] w-[24px] border-1"/></button></>)}
                {(group == "company") && (<><button style={{zIndex : 10}} onClick={handleNavigateProfile} className="cursor-pointer"><img src={`http://localhost:3007/Upload/${company?.logo?.filename}`} className="rounded-full h-[24px] w-[24px] border-1"/></button></>)}
                <div className='flex items-center'>
                <button onClick={() => setOpen(true)} className="cursor-pointer rounded-xl"><img src={Logout}/></button> 
                </div>
                </div>

                </div>
                </>
            )}


            </div>
        </div>
        <Dialog open={open} onClose={() => {setOpen(false)}} PaperProps={{sx: {borderRadius: 4 ,padding: 3, minWidth: 400, backgroundColor: '#f9fafb'}, elevation : 6 }}>
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}><span className='font-[Poppins] text-3xl'>Log Out of Account <span className='font-[Poppins] text-3xl text-blue-400'> {profile?.email}</span>?</span></DialogTitle>
            <DialogActions sx={{ustifyContent: 'center', gap: 2, pt: 2 }}>
                <button onClick={() => {setOpen(false); navigate("/login")}} className='bg-green-500 hover:bg-green-600 hover:scale-105 rounded-full  py-2 px-5 text-white text-xl cursor-pointer'>Yes</button>
                <button onClick={() => setOpen(false)} className='bg-red-500 hover:bg-red-600 hover:scale-105 rounded-full  py-2 px-5 text-white text-xl cursor-pointer'>No</button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default Navbar