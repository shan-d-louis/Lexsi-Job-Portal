import React, { useEffect, useState } from 'react'
import axios from "axios"
import Star from "../assets/Star 1.png";
import Logout from "../assets/logout.png"
import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar(props) {

    const [login, setLogin] = useState(false);
    const [profile, setProfile] = useState({});
    const [group, setGroup] = useState("admin")

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

  return (
    <div>
        <div className="px-9 py-5">
            <div className="justify-between items-center flex mx-6">

            {/* Navbar-brand */}
            <a className="flex items-center">
                <img src={Star} className="h-7 w-7" alt="Logo"/>
                
                <span className="ms-3 text-2xl font-semibold text-[#384371]">Lexsi - Admin</span>
            </a>

            {/* Navbar-list */}
            <ul className="hidden sm:flex space-x-10" style={{zIndex : 5}}>
                <li><Link className="text-xl cursor-pointer" to="/home" >Home</Link></li>
                <li><Link className="text-xl cursor-pointer" to="/jobs">Jobs</Link></li>
                <li><Link className='text-xl cursor-pointer' to="/application">Application Status</Link></li>
                <li><Link className="text-xl cursor-pointer" to="/about">About</Link></li>
                <li><Link className="text-xl cursor-pointer" to="/contact">Contact</Link></li>
            </ul>

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
                <span style={{zIndex : 5}} onClick={() => {navigate("/admin/profile")}} className="cursor-pointer text-xl">Hi, {profile.name}</span>
                <Link style={{zIndex : 5}} onClick={() => {navigate("/admin/profile")}} className="cursor-pointer"><img src={`http://localhost:3007/Upload/${profile.image?.filename}`} className="rounded-full h-[24px] w-[24px] border-1"/></Link>
                <div className='flex items-center'>
                <button onClick={() => {navigate("/login")}} className="cursor-pointer rounded-xl"><img src={Logout}/></button> 
                </div>
                </div>

                </div>
                </>
            )}


            </div>
        </div>
    </div>
  )
}

export default AdminNavbar