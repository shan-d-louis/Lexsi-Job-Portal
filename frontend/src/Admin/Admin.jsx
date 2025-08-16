import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import AdminProfile from './AdminProfile'
import Footer from '../Footer'
import axios from 'axios'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Button
} from '@mui/material';

function Admin() {
  const [data, setData] = useState([])
  const [view, setView] = useState("")

  const handleView = (view) => {
    axios.post(`http://localhost:3007/view-${view}`)
      .then((res) => {
        setData(res.data.data)
        setView(view)
      })
      .catch((err) => console.log(err))
  }

  const handleDelete = (item, user_id) => {
    axios.post(`http://localhost:3007/remove-${item}/${user_id}`)
      .then(() => {
        if (item === "user") handleView("users")
        if (item === "company") handleView("companies")
      })
      .catch((err) => console.log(err))
  }

  const handleViewUnapproved = () => {
    axios.post("http://localhost:3007/view-unapproved-companies")
      .then((res) => {
        setData(res.data.data)
        setView("unapproved")
      })
      .catch((err) => console.log(err))
  }

  const handleApprove = (company_id, user_id) => {
    axios.post(`http://localhost:3007/approve-company/${company_id}/${user_id}`)
      .then(() => handleViewUnapproved())
      .catch((err) => console.log(err))
  }

  // Reusable Table Component
  const renderTable = () => {
    if (view === "users") {
      return (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1967D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Profile</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Password</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Skills</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={user.name}
                      src={`http://localhost:3007/${user.image?.path?.replace(/\\/g, "/")}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.skills}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete("user", user?._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    if (view === "companies") {
      return (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1967D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Logo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Industry</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Website</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((company, index) => (
                <TableRow key={index}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={company.name}
                      src={`http://localhost:3007/${company.logo?.path?.replace(/\\/g, "/")}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{`${company.province}, ${company.country}`}</TableCell>
                  <TableCell>{company.website}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete("company", company?._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    if (view === "unapproved") {
      return (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1967D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Logo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Industry</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Website</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((company, index) => (
                <TableRow key={index}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={company.name}
                      src={`http://localhost:3007/${company.logo?.path?.replace(/\\/g, "/")}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{`${company.province}, ${company.country}`}</TableCell>
                  <TableCell>{company.website}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(company?._id, company?.user_id)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    return null
  }

  return (
    <>
      <AdminNavbar />
      <div className='mx-[200px]'>
        {/* User Commands */}
        <span className='font-[Poppins] font-semibold text-5xl text-[#1967D2]'>User Commands</span>
        <div className='flex mx-5 my-6 space-x-12'>
          <button onClick={() => { handleView("users") }} className='p-10 rounded-xl bg-[#C8CCCF] font-medium'>
            Manage Users
          </button>
          <span className='p-10 text-[#1967D2] font-semibold text-2xl'>View and Delete User</span>
        </div>

        {/* Company Commands */}
        <span className='font-[Poppins] font-semibold text-5xl text-[#1967D2]'>Company Commands</span>
        <div className='flex mx-5 my-6 space-x-12'>
          <button onClick={() => { handleView("companies") }} className='p-10 rounded-xl bg-[#C8CCCF] font-medium'>
            Manage Companies
          </button>
          <span className='p-10 text-[#1967D2] font-semibold text-2xl'>View and Delete Companies</span>
          <button onClick={handleViewUnapproved} className='p-10 rounded-xl bg-[#C8CCCF] font-medium'>
            Approve Company
          </button>
          <span className='p-10 text-[#1967D2] font-semibold text-2xl'>Approve New Companies</span>
        </div>

        {renderTable()}
      </div>
      <AdminProfile color="#1967D2" />
      <Footer />
    </>
  )
}

export default Admin
