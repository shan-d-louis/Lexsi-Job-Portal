  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import Paper from '@mui/material/Paper';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TablePagination from '@mui/material/TablePagination';
  import TableRow from '@mui/material/TableRow';
  import Avatar from '@mui/material/Avatar';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button';
  import Select from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';
  import InputLabel from '@mui/material/InputLabel';
  import FormControl from '@mui/material/FormControl';
  import Check from "../assets/Check.png";
  import Reject from "../assets/Reject.png";

  function AppTech(props) {
    const [apps, setApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState("");
    const [interviewDateTime, setInterviewDateTime] = useState("");
    const [gmeetLink, setGmeetLink] = useState("");

    const [tests, setTests] = useState([])
    const [selectedTest, setSelectedTest] = useState({})

    const company_id = localStorage.getItem("company_id")

    const columns = [
      { id: 'sno', label: 'S NO', minWidth: 50 },
      { id: 'profile', label: 'Profile', minWidth: 100 },
      { id: 'name', label: 'Name', minWidth: 150 },
      { id: 'phone', label: 'Phone Number', minWidth: 150 },
      { id: 'email', label: 'Email ID', minWidth: 200 },
      { id: 'appliedDate', label: 'Applied Date', minWidth: 150 },
      { id: 'interview', label: 'Interview', minWidth: 120 },
      { id: 'action', label: 'Action', minWidth: 120 },
    ];

    useEffect(() => {
      setApps(props.apps)
    }, [props.apps]);

    useEffect(() => {
          axios.post(`http://localhost:3007/fetch-tests/${company_id}`)
              .then((res) => {
                  setTests(res.data.data.tests)
              })
              .catch((err) => {
                  console.log(err)
              })
      }, [])

    const filteredApps = apps.filter((app) =>
      app.user_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user_id?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user_id?.contact?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleStatus = (app_id, status) => {
      axios.post(`http://localhost:3007/update-status/${app_id}/${status}`)
        .then(()=> {
          props.handleReload();
        })
        .catch((err) => {
          console.log(err)
        });
    };

    const openScheduleDialog = (appId) => {
      setSelectedAppId(appId);
      setInterviewDateTime("");
      setGmeetLink("");
      setSelectedTest("")
      setOpenDialog(true);
    };

    const closeDialog = () => {
      setOpenDialog(false);
      setSelectedAppId("");

      document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
      if (!el.closest('[role="dialog"]')) {
        el.removeAttribute('aria-hidden');
      }
      });
    };

    const handleScheduleSubmit = (e) => {
      e.preventDefault()
      console.log(selectedAppId)
      axios.post(`http://localhost:3007/schedule-tech-interview/${selectedAppId}`, {techInterviewTime: interviewDateTime, techGmeetLink : gmeetLink, testName : selectedTest})
      .then((res) => {
        console.log(res)
        handleStatus(selectedAppId, 2) //FIGURE THIS OUT
        props.handleReload();
        closeDialog();
      })
      .catch(err => {
          console.error(err)
      });
    };

    console.log(tests)
    return (
      <div className='w-[1280px] mx-auto flex flex-col p-5 shadow-2xl rounded-4xl'>
        
        {/* Search Bar */}
        <div className='mb-4 flex justify-end'>
          <input type="text" placeholder="Search by name, email, or phone..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setPage(0);}} className="border border-gray-400 rounded-lg p-2 w-80"/>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="applications table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{minWidth: column.minWidth,color: "#5E95E0",fontWeight: "bold",fontFamily: "Poppins",textAlign: "center"}}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApps
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((app, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={app._id || index}>
                      
                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>

                      <TableCell style={{ justifyItems: "center" }}>
                        <Avatar src={`http://localhost:3007/Upload/${app.user_id?.image?.filename}` || ""} />
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {app.user_id?.name}
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {app.user_id?.contact}
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {app.user_id?.email}
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {app?.DOA ? new Date(app.DOA).toLocaleDateString() : "N/A"}
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        {(!app?.techInterviewTime) && (<button onClick={() => openScheduleDialog(app._id)} className='font-[Poppins] font-medium text-white cursor-pointer text-centre rounded-full w-[150px] h-[45px] bg-[#1967D2]'>
                          Schedule Interview
                        </button>)}
                        {(app?.techInterviewTime) && (
                          <span className='font-[Poppins] text-center'>Score: {app?.testScore}</span>
                        )}
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                        <div className='flex justify-center items-center space-x-5'>
                          {(app.status == 3 || app.status == 2) && (
                            <>
                              <button className='cursor-pointer' onClick={() => {handleStatus(app._id, 4)}}> 
                                <img src={Check} alt="Approve" /> 
                              </button>
                              <button className='cursor-pointer' onClick={() => {handleStatus(app._id, -3)}}> 
                                <img src={Reject} alt="Reject" /> 
                              </button>
                            </>
                          )}

                          {(app.status == -3) && (
                            <div className='flex flex-col justify-center items-center'>
                            <span className='text-sm font-[Poppins] font-medium text-[#FF3D00]'>Rejected</span>
                            </div>
                          )}

                          {(app.status > 3) && (
                            <div className='flex flex-col justify-center items-center'>
                            <span className='text-sm font-[Poppins] font-medium text-[#6BB46E]'>Success</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={filteredApps.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>

        {/* Schedule Interview Dialog */}
        <Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="sm">
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogContent>
            
            <TextField margin="dense" label="Interview Date & Time" type="datetime-local" fullWidth value={interviewDateTime} onChange={(e) => setInterviewDateTime(e.target.value)} InputLabelProps={{shrink: true,}} sx={{ marginBottom: 2 }}/>
            
            <TextField sx={{marginBottom : 2}} margin="dense" label="Google Meet Link" type="url" fullWidth value={gmeetLink} onChange={(e) => setGmeetLink(e.target.value)} />
            
            <FormControl label="Select Test" fullWidth sx={{marginBottom : 2}}>
              <InputLabel id="select-test">Select Test</InputLabel>

              <Select labelId="select-test" value={selectedTest}>
                {tests.map((test, index) => {return(
                  <MenuItem key={index} value={test?.name} onClick={() => {setSelectedTest(test?.name)}}>
                    {test?.name}
                  </MenuItem>
                )})}
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="error">Cancel</Button>
            <Button onClick={handleScheduleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default AppTech;
