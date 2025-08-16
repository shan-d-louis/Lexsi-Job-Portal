import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from './Navbar'
import Footer from './Footer'
import Clock from "./assets/Clock.png"
import Location from "./assets/Location.png"
import Industry from "./assets/Industry.png"
import Search from "./assets/Search.png"
import { Link } from 'react-router-dom'

function Job() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.post("http://localhost:3007/view-jobs")
      .then((res) => {
        setJobs(res.data.data);
        setFilteredJobs(res.data.data); // initial full list
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = jobs.filter(job =>
      job.role?.toLowerCase().includes(value) ||
      job.skills?.toLowerCase().includes(value) ||
      job.location?.toLowerCase().includes(value) ||
      job.company_id?.district?.toLowerCase().includes(value) ||
      job.company_id?.country?.toLowerCase().includes(value) ||
      job.type?.toLowerCase().includes(value)
    );

    setFilteredJobs(filtered);
  };

  return (
    <>
      <Navbar />

      <div className='flex mx-[50px] my-2 justify-end px-5'>
        <label className='flex bg-gray-50 rounded-4xl p-3 space-x-2 border-gray-300'>
          <img src={Search} className='h-[24px] w-[24px]' alt="Search Icon" />
          <input
            value={search}
            onChange={handleSearch}
            className='border-none outline-none'
            placeholder='Search Jobs here...'
            type="text"
          />
        </label>
      </div>

      <div className='flex mx-auto w-[1280px] rounded-xl p-5 justify-center flex-wrap gap-4 shadow-2xl'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => {
            const image = `http://localhost:3007/Upload/${job.company_id?.logo?.filename}`;
            return (
              <div key={index} className='w-[400px] h-[350px] flex flex-col p-5 justify-center bg-[#F0F6FE] rounded-2xl shadow-xl'>
                <div className='flex justify-between mx-5'>
                  <div>
                    <span className='font-[Poppins] font-semibold text-lg text-[#384371]'>{job.role}</span><br />
                    <span className='text-[#384371] font-[Poppins] text-sm'>{job.skills}</span>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={image} alt="Company Logo" className='text-xs h-[50px] w-[50px] rounded-xl' />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job.company_id?.name}</span>
                  </div>
                </div>

                <div className='mx-5 my-5 flex flex-col space-y-3'>
                  <div className='flex space-x-2'>
                    <img src={Location} alt="Location Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>
                      {job.location}
                    </span>
                  </div>

                  <div className='flex space-x-2'>
                    <img src={Clock} alt="Clock Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.deadline?.slice(0,10)}</span>
                  </div>

                  <div className='flex space-x-2'>
                    <img src={Industry} alt="Industry Icon" />
                    <span className='text-sm font-[Poppins] font-medium text-[#384371]'>{job?.industry}</span>
                  </div>
                </div>

                <Link
                  to={`/apply-job/${job._id}`}
                  className="w-[200px] p-3 px-5 text-white border-1 border-white rounded-3xl bg-[#1967D2] font-[Poppins] text-sm font-medium"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 font-[Poppins]">No jobs found.</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Job;
