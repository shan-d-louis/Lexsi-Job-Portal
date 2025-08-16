import React from 'react'
import Navbar from './Navbar'
import SignUp from './SignUp'
import Footer from './Footer'
import {Routes, Route} from "react-router-dom"
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import PersonalInfo from './PersonalInfo'
import HomePage from './HomePage'
import About from './About'
import Contact from './Contact'
import ViewProfile from './ViewProfile'
import Job from './Job'
import Application from "./Application.jsx"
import ApplyJob from './ApplyJob'
import CompanyHomePage from './Company/CompanyHomePage'
import CompanyJob from './Company/CompanyJob'
import CompanyApplications from './Company/CompanyApplications'
import CompanyProfile from './Company/CompanyProfile'
import Admin from './Admin/Admin'
import AdminProfile from './Admin/AdminProfile'
import CompanyTech from './Company/CompanyTech'
import '@fontsource/poppins/400.css';
import { createTheme, ThemeProvider } from '@mui/material'
import Test from './Test.jsx'
import TestThanks from './TestThanks.jsx'

const theme = createTheme({typography : {fontFamily : "Poppins, Arial, sans-serif"}})
function App() {
  return (
    <>
    
    <Routes>
      
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:email" element={<ResetPassword/>}/>
        <Route path="/personal-info" element={<PersonalInfo/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/> 
        <Route path="/profile" element={<ViewProfile/>}/>
        <Route path="/jobs" element={<Job/>}/>
        <Route path="/application" element={<ThemeProvider theme={theme}><Application/></ThemeProvider>}/>
        <Route path="/apply-job/:job_id" element={<ApplyJob/>}/>
        <Route path="/test/:app_id" element={<Test/>}/>
        <Route path="/test-thankyou/:score/:maxScore" element={<TestThanks/>}/>

        <Route path="/company/home" element={<CompanyHomePage/>}/>
        <Route path="/company/job" element={<CompanyJob/>}/>
        <Route path="/company/applications" element={<CompanyApplications/>}/>
        <Route path="/company/profile" element={<CompanyProfile/>}/>
        <Route path="/company/tech" element={<CompanyTech/>}/>

        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/profile" element={<AdminProfile color="#C8CCCF" edit={true}/>}/>
    </Routes>
    </>
)}

export default App