import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Phone from "../assets/Phone.png"
import Mail from "../assets/Mail.png"
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

function CompanyProfile(params) {
  const [profile, setProfile] = useState({})
  const [reload, setReload] = useState(true)

  const edit = params.edit;
  var user_id = localStorage.getItem("userId")

  useEffect(() => {
    axios.post(`http://localhost:3007/find-company/${user_id}`)
      .then((res) => {
          var userDetails = {...(res.data.data[0])};
          setProfile(userDetails);
      })
  },[reload])  

  const handleUserChange = async (field) => {
    var value = await prompt(`Update ${field}: `)

    axios.post(`http://localhost:3007/update-user/${user_id}/${field}/${value}`)
      .then((res) => {
        console.log(res)
        setReload(!reload)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = async (field) => {
    var value = await prompt(`Update ${field}: `)
    const company_id = profile._id

    axios.post(`http://localhost:3007/update-company/${company_id}/${field}/${value}`)
      .then((res) => {
        console.log(res)
        setReload(!reload)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeImage = async (e) => {
      const company_id = profile._id
      const formData = new FormData()

      formData.append("logo", e.target.files[0])

      axios.post(`http://localhost:3007/update-company-logo/${company_id}`, formData,{ headers: { "Content-Type": "multipart/form-data" }})
        .then((res) => {
        console.log(res)
        setReload(!reload)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  console.log(profile.image)

  return (
    <>
    <Navbar/>

        <div className="flex justify-center">
        <div className="w-[1000px] h-[283px] ms-5 my-[100px] rounded-3xl flex items-center ps-[100px] space-x-[75px]" style={{backgroundColor : `#C8CCCF`}}>

            <label className='text-start text-white font-[Poppins] text-3xl font-semibold'>
                  <input type="file" id="profile" className='hidden' onChange={handleChangeImage}/><img src={`http://localhost:3007/Upload/${profile.logo?.filename}`}  className='border-2 border-white h-[180px] w-[180px] rounded-full'/>
                  Update Profile
            </label>

            <div className='text-center w-[225px] flex flex-col space-y-10'>
              <span onClick={() => {handleChange("name")}} className='cursor-pointer text-4xl font-[Poppins] text-white font-semibold'>{profile.name}</span>

              <div className='font-[Poppins] ps-5 '>
                  <div onClick={() => {handleUserChange("email")}} className='cursor-pointer flex items-center space-x-2'><img src={Mail} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile?.user_id?.email}</span></div>
                  <br/>
                  <div onClick={() => {handleUserChange("contact")}} className='flex items-center space-x-2'><img src={Phone} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile?.user_id?.contact}</span></div>
              </div>
            </div>
            
            <div className='border-l-1 h-[200px] flex flex-col items-center  justify-center border-white my-3 ms-12 ps-12 space-y-2'>
              <Link to="/company/application" className='rounded-full bg-amber-400 p-3 me-9 text-white text-center font-[Poppins] font-medium border-2 border-white'>View Applications</Link>
            </div>
    
        </div>
        </div>
    <Footer/>
    </>
  )
}

export default CompanyProfile