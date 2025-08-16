import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Phone from "./assets/Phone.png"
import Mail from "./assets/Mail.png"
import { Link } from 'react-router-dom'

function Profile(params) {
  const [profile, setProfile] = useState({})
  
  const edit = params.edit;
  var userId = localStorage.getItem("userId")

  useEffect(() => {
    axios.post(`http://localhost:3007/find-user/${userId}`)
      .then((res) => {
          var userDetails = {...(res.data.data[0])};
          setProfile(userDetails);
      })
  },[])  

  const handleChange = async (field) => {
    var value = await prompt(`Update ${field}: `)

    axios.post(`http://localhost:3007/update-user/${userId}/${field}/${value}`)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeImage = async (e) => {
      var profile = await document.getElementById("profile").value
      const formData = new FormData()

      formData.append("image", e.target.files[0])

      axios.post(`http://localhost:3007/update-user-profile/${userId}`, formData,{ headers: { "Content-Type": "multipart/form-data" }})
        .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })

  }

  console.log(profile.image)

  return (
    <>   


        <div className="flex justify-center">
        <div className="w-[1000px] h-[283px] ms-5 my-[100px] rounded-3xl flex items-center ps-[100px] space-x-[75px]" style={{backgroundColor : `${params.color}`}}>
            

        {(!edit) && (
              <>

              <label className='text-center text-white font-[Poppins] text-3xl font-semibold'>
                    <img src={`http://localhost:3007/Upload/${profile.image?.filename}`} className='border-2 border-white h-[180px] w-[180px] rounded-full'/>
                    Profile
              </label>

              <div className='text-center w-[225px] flex flex-col space-y-10'>
                <span className='text-4xl font-[Poppins] text-white font-semibold'>{profile.name}</span>

                <div className='font-[Poppins] ps-5 '>
                    <div className='flex items-center space-x-2'><img src={Mail} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.email}</span></div>
                    <br/>
                    <div className='flex items-center space-x-2'><img src={Phone} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.contact}</span></div>
                </div>
              </div>
              
              <div className='border-l-1 h-[200px] flex flex-col   justify-center border-white ms-12 ps-12 space-y-12'>
              <Link to="/profile" className='rounded-full bg-amber-400 p-3 text-white text-center font-[Poppins] font-medium border-2 border-white'>Update Profile</Link>
              <Link to="#" className='rounded-full bg-amber-400 p-3 text-white text-center font-[Poppins] font-medium border-2 border-white'>View Applications</Link>
              </div>
              </>
        )}

        {(edit) && (
          <>
            <label className='text-start text-white font-[Poppins] text-3xl font-semibold'>
                  <input type="file" id="profile" className='hidden' onChange={handleChangeImage}/><img src={`http://localhost:3007/Upload/${profile.image?.filename}`}  className='border-2 border-white h-[180px] w-[180px] rounded-full'/>
                  Update Profile
            </label>

            <div className='text-center w-[225px] flex flex-col space-y-10'>
              <span onClick={() => {handleChange("name")}} className='cursor-pointer text-4xl font-[Poppins] text-white font-semibold'>{profile.name}</span>

              <div className='font-[Poppins] ps-5 '>
                  <div onClick={() => {handleChange("email")}} className='cursor-pointer flex items-center space-x-2'><img src={Mail} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.email}</span></div>
                  <br/>
                  <div onClick={() => {handleChange("contact")}} className='flex items-center space-x-2'><img src={Phone} className='h-[30px] w-[30px] border-2 rounded-full'/> <span className='text-white text-sm'>{profile.contact}</span></div>
              </div>
            </div>
            
            <div className='border-l-1 h-[200px] flex flex-col items-center  justify-center border-white my-3 ms-12 ps-12 space-y-2'>
              <label onClick={() => {handleChange("skills")}} className='h-[150px] w-[200px] cursor-pointer text-white font-[Poppins] text-lg'>
                <span className='text-3xl font-medium'>Job Roles</span> <br/>
                {profile.skills}
              </label>
          
              
              <Link to="/application" className='rounded-full bg-amber-400 p-3 me-9 text-white text-center font-[Poppins] font-medium border-2 border-white'>View Applications</Link>
            </div>
          </>
        )}
        </div>
        </div>
    </>
  )
}

export default Profile