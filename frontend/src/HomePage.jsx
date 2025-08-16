import React, { useState } from 'react'
import Vector1 from "./assets/Vector 1.png"
import Vector2 from "./assets/Vector 2.png"
import HomePageLady from "./assets/HomePage Lady.png"
import Award from "./assets/Award.png"
import Like from "./assets/Like.png"
import Verified from "./assets/Verified.png"
import JobsDone from "./assets/Jobs done.png"
import Navbar from './Navbar'
import Footer from './Footer'
import Profile from './Profile'
import Work from './Work'

// Material UI imports
import { Button, Modal, Box, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const [openModal, setOpenModal] = useState(false)
  const [companyData, setCompanyData] = useState({name: '',logo: null,industry: '',province: '',country: '',website: '',description: ''})

  const navigate = useNavigate();

  const handleOpenModal = () => {setOpenModal(true)}
  const handleCloseModal = () => {setOpenModal(false)}

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'logo') {
      setCompanyData(prev => ({ ...prev, logo: files[0] }))
    } else {
      setCompanyData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const user_id = localStorage.getItem("userId")

        const formData = new FormData()
        formData.append('name', companyData.name)
        formData.append('logo', companyData.logo)
        formData.append('industry', companyData.industry)
        formData.append('province', companyData.province)
        formData.append('country', companyData.country)
        formData.append('website', companyData.website)
        formData.append('desc', companyData.description)

        const res = await axios.post(`http://localhost:3007/register-company/${user_id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})

        console.log('Company registered:', res.data)
        setOpenModal(false)
        setCompanyData({
            name: '',
            logo: null,
            industry: '',
            province: '',
            country: '',
            website: '',
            description: ''
      })

    } catch (error) {
      console.error('Error registering company:', error)
    }
  }

  return (
    <>
      <Navbar />

      {/* HERO Section */}
      <div
        className="h-[649px] flex justify-between items-center px-19"
        style={{
          backgroundImage: `url(${Vector2}), url(${Vector1})`,
          backgroundSize: "contain, contain",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "left bottom, left bottom"
        }}
      >
        <div className="font-[Poppins] h-[506px] w-[620px]">

          <div className="border-1 text-[#384371] font-[Poppins] h-[55px] w-[276px] rounded-4xl border-[#1967D2B2] justify-center flex items-center">
            ⭐ Your Career Starts Here!
          </div>
          <br /><br />

          <span className="text-7xl font-semibold">Find Your Dream</span> <br /> <br />
          <span className="text-7xl font-semibold text-[#1967D2]">Job Today</span>
          <br /><br /><br />

          <p className="text-[#384371] text-sm font-semibold">Explore thousands of job opportunities from trusted employers. Whether you're starting your journey or looking for the next big step, we've got you covered.</p>
          <br /><br />

          <Link to="/jobs" className="bg-[#1967D2] hover:scale-105 rounded-full  py-2 px-5 text-white text-xl cursor-pointer">Apply Now →</Link>
          <Link to="/about" className="rounded-full hover:scale-105  py-2 px-5 text-xl cursor-pointer">Learn More →</Link>
        </div>

        <div className="h-[649px] w-[649px] bg-radial rounded-full from-blue-700 via-blue-200">
          <img src={HomePageLady} className="me-[143px] mt-[-285px]" />

          <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl mt-[-600px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
            <img src={Award} className="bg-blue-600 rounded-full p-2 h-[40px]" />
            <span>Fast, Easy, and Free to Register!</span>
          </div>

          <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl ms-[430px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
            <img src={Like} className="bg-blue-600 rounded-full p-2 h-[40px]" />
            <span>Trusted by Thousands of Job Seekers!</span>
          </div>

          <div className="w-[264px] h-[62px] rounded-2xl bg-white shadow-2xl mt-[220px] ms-[-110px] font-semibold text-sm font-[Poppins] flex space-x-5 items-center p-5">
            <img src={Verified} className="bg-blue-600 rounded-full p-2 h-[40px]" />
            <span>Search Thousands of Verified Listings!</span>
          </div>

          <div className="w-[167px] h-[89px] ms-[480px]">
            <img src={JobsDone} />
          </div>

        </div>
      </div>
      <div className="flex justify-center mt-[-50px]">
        <button onClick={() => {navigate("/jobs")}} className="h-[100px] w-[400px] hover:scale-105 rounded-full bg-gradient-to-b from-blue-400 to-blue-700 shadow-2xl cursor-pointer font-bold text-3xl text-center text-yellow-500 font-[Poppins]">
          <span>Enhance Your Career</span>
        </button>
      </div>

      <Profile color="#1967D2" edit={false} />

      <Work />

      <div className='mx-12 my-12 py-12 px-[100px] rounded-tl-full rounded-br-full bg-blue-50 flex items-center'>
        <div>
          <span className="ms-[400px] text-7xl font-semibold text-[#1967D2]">Post Jobs?</span> <br /><br />
          <p className="text-black text-xl text-start font-[Poppins] w-[750px] ms-10">Looking to hire top talent? Register your company today and unlock powerful tools to manage your recruitment process. <br /><br /> As a verified company, you'll be able to post job openings, track applications, create offer letters, and connect directly with qualified candidates. Whether you're a startup or an established enterprise, our platform gives you full control to build your team efficiently. It's quick, easy, and free to get started—just sign up and start hiring!
          </p>
        </div>
        <div>
          <button className='bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-400 rounded-full p-6 text-white font-[Poppins] font-semibold text-2xl cursor-pointer hover:scale-105' onClick={handleOpenModal}>
            Register as Company
          </button>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-company-register-title"
        aria-describedby="modal-company-register-description"
      >
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>

          <Typography id="modal-company-register-title" variant="h6" component="h2" mb={2}>
            Register New Company
          </Typography>

          <TextField
            fullWidth
            required
            label="Company Name"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 1 }}
            fullWidth
          >
            Upload Logo
            <input
              type="file"
              accept="image/*"
              hidden
              name="logo"
              onChange={handleChange}
            />
          </Button>
          {companyData.logo && <Typography variant="body2">{companyData.logo.name}</Typography>}

          <TextField
            fullWidth
            label="Industry"
            name="industry"
            value={companyData.industry}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Province"
            name="province"
            value={companyData.province}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Country"
            name="country"
            value={companyData.country}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Website Link"
            name="website"
            value={companyData.website}
            onChange={handleChange}
            margin="normal"
            type="url"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={companyData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>

        </Box>
      </Modal>

      <Footer />
    </>
  )
}

export default HomePage
