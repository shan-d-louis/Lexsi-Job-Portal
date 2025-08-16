import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Clock from "../assets/Clock.png";
import Location from "../assets/Location.png";
import Industry from "../assets/Industry.png";
import Search from "../assets/Search.png";
import { useNavigate } from 'react-router-dom';

function CompanyJob() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(true)
  const [jobData, setJobData] = useState({
    role: '',
    skills: '',
    location: '',
    industry: '',
    salary: '',
    datePosted: '',
    deadline: '',
    experience: '',
    jobType: '',
    desc: '',
    responsibilities: '',
    requirements: ''
  });

  const company = localStorage.getItem("company_id");

  useEffect(() => {
    axios.post(`http://localhost:3007/view-jobs/${company}`)
      .then((res) => {
        setJobs(res.data.data);
        setFilteredJobs(res.data.data); 
      })
      .catch(err => console.log(err));
  }, [company, reload]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = jobs.filter(job =>
      job.role?.toLowerCase().includes(value) ||
      job.skills?.toLowerCase().includes(value) ||
      job.location?.toLowerCase().includes(value) ||
      job.industry?.toLowerCase().includes(value)
    );

    setFilteredJobs(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddJob = () => {
    axios.post(`http://localhost:3007/add-job/${company}`, { ...jobData })
      .then((res) => {
        const newJob = res.data.newJob;
        setJobs(prev => [...prev, newJob]);
        setFilteredJobs(prev => [...prev, newJob]); 
        setOpen(false);
        setJobData({
          role: '',
          skills: '',
          location: '',
          industry: '',
          salary: '',
          datePosted: '',
          deadline: '',
          experience: '',
          jobType: '',
          desc: '',
          responsibilities: '',
          requirements: ''
        });
        setReload(!reload)
      })
      .catch(err => console.log(err));
  };
  console.log(company)

  return (
    <>
      <Navbar />

      <div className='flex mx-[50px] my-2 justify-between px-5'>
        <label className='flex bg-gray-50 rounded-4xl p-3 space-x-2 border-gray-300'>
          <img src={Search} className='h-[24px] w-[24px]' alt="Search Icon" />
          <input className='border-none outline-none' value={search} onChange={handleSearch} placeholder='Search Jobs here...' type="text"/>
        </label>

        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Job
        </Button>
      </div>

      {/* Job Cards */}
      <div className='flex mx-auto w-[1280px] rounded-xl p-5 justify-center flex-wrap gap-4 shadow-2xl'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => {
            const image = `http://localhost:3007/Upload/${job?.company_id?.logo?.filename}`;
            return (
              <div key={index} className='w-[400px] h-[350px] flex flex-col p-5 justify-center bg-[#F0F6FE] rounded-2xl shadow-xl'>
                <div className='flex justify-between mx-5'>
                  <div>
                    <span className='font-[Poppins] font-semibold text-lg text-[#384371]'>{job?.role}</span><br />
                    <span className='text-[#384371] font-[Poppins] text-sm'>{job?.skills}</span>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={image} alt="Company Logo" className='text-xs rounded-xl h-[50px] w-[50px]' />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.company_id?.name}</span>
                  </div>
                </div>

                <div className='mx-5 my-5 flex flex-col space-y-3'>
                  <div className='flex space-x-2'>
                    <img src={Location} alt="Location Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.location}</span>
                  </div>

                  <div className='flex space-x-2'>
                    <img src={Clock} alt="Clock Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.deadline?.slice(0, 10)}</span>
                  </div>

                  <div className='flex space-x-2'>
                    <img src={Industry} alt="Industry Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.industry}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/company/applications")}
                  className="w-[200px] p-3 px-5 text-white border-1 border-white rounded-3xl bg-[#1967D2] font-[Poppins] text-sm font-medium cursor-pointer"
                >
                  View Applications
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 font-[Poppins]">No jobs found.</p>
        )}
      </div>

      {/* Add Job Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent dividers>
          {[
            "role", "skills", "location", "industry", "salary",
            "datePosted", "deadline", "experience", "jobType",
            "responsibilities", "requirements"
          ].map((field, index) => (
            <TextField
              key={index}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field.includes("Date") ? "date" : field === "experience" ? "number" : "text"}
              name={field}
              value={jobData[field]}
              onChange={handleChange}
              fullWidth
              InputLabelProps={field.includes("Date") ? { shrink: true } : {}}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
          <Button onClick={handleAddJob} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}

export default CompanyJob;
