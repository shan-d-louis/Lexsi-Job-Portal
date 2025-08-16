import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import AppReview from './AppReview'
import axios from 'axios'
import AppTech from './AppTech'
import AppHr from './AppHr'

function CompanyApplications() {
  const [apps, setApps] = useState([])
  const [review, setReview] = useState([])
  const [tech, setTechnical] = useState([])
  const [hr, setHr] = useState([])
  const [page, setPage] = useState("review")
  const [reload, setReload] = useState(true)
  const company_id = localStorage.getItem("company_id")

  useEffect(() => {
    axios.post(`http://localhost:3007/view-apps/${company_id}`)
      .then((res) => {
        setApps(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });

  },[reload])

  useEffect( () => {
    var filterReview =  apps?.filter((app) => app.status < 2 && app.status > -3)  
    var filterTech =  apps?.filter((app) => app.status >= 2 || app.status == -3)  
    var filterHr =  apps?.filter((app) => app.status > 3 || app.status == -5)  

    setReview(filterReview)
    setTechnical(filterTech)
    setHr(filterHr)
  }, [apps])

  const changeStatus = (status) => {
    setPage(status)
  }

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
    <Navbar/>
          <div className='mx-auto my-5 rounded-full w-[470px] h-[55px] flex items-center justify-center shadow-2xl'>
            <button onClick={() => {changeStatus("review")}} style={{backgroundColor : (page == 'review' ? "#1967D2" : "white"), color : (page == 'review' ? "white" : "black")}} className ="font-[Poppins] font-medium text-centre rounded-full w-[150px] h-[45px] bg-white"> Review</button>
            <button onClick={() => {changeStatus("tech")}} style={{backgroundColor : (page == 'tech' ? "#1967D2" : "white"), color : (page == 'tech' ? "white" : "black")}} className ="font-[Poppins] font-medium text-centre rounded-full w-[150px] h-[45px] bg-white"> Technical </button>
            <button onClick={() => {changeStatus("hr")}} style={{backgroundColor : (page == 'hr' ? "#1967D2" : "white"), color : (page == 'hr' ? "white" : "black")}} className ="font-[Poppins] font-medium text-centre rounded-full w-[150px] h-[45px] bg-white"> HR </button>
          </div>
        
        {(page == "review") && (<><AppReview apps={review} handleReload={handleReload}/></>)}
        {(page == "tech") && (<><AppTech apps={tech} handleReload={handleReload}/></>)}
        {(page == "hr") && (<><AppHr apps={hr} handleReload={handleReload}/></>)}
    <Footer/>
    </>
  )
}

export default CompanyApplications