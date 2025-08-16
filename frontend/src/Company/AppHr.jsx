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
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Check from "../assets/Check.png";
import Reject from "../assets/Reject.png";

function AppHr(props) {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [gmeetLink, setGmeetLink] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);

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
    setApps(props.apps);
  }, [props.apps]);

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
      .then((res) => {
        console.log(res);
        props.handleReload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openScheduleDialog = (appId) => {
    setSelectedAppId(appId);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setInterviewDateTime("");
    setGmeetLink("");
    setSelectedAppId(null);
  };

  const handleScheduleSubmit = () => {
    if (!interviewDateTime || !gmeetLink) {
      alert("Please fill in both the date/time and the link.");
      return;
    }

    axios.post(`http://localhost:3007/schedule-hr-interview/${selectedAppId}`, {hrInterviewTime: interviewDateTime, hrGmeetLink: gmeetLink})
      .then((res) => {
        console.log("Interview scheduled:", res.data);
        closeDialog();
        props.handleReload();
      })
      .catch((err) => {
        console.error("Error scheduling interview:", err);
      });
  };

  return (
    <div className='w-[1280px] mx-auto flex flex-col p-5 shadow-2xl rounded-4xl'>

      {/* Search Bar */}
      <div className='mb-4 flex justify-end'>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          className="border border-gray-400 rounded-lg p-2 w-80"
        />
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="applications table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      color: "#5E95E0",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      textAlign: "center"
                    }}
                  >
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
                      {(!app?.hrInterviewTime) && (<button onClick={() => openScheduleDialog(app._id)} className='font-[Poppins] font-medium text-white cursor-pointer text-centre rounded-full w-[150px] h-[45px] bg-[#1967D2]'>
                        Schedule Interview
                      </button>)}

                      {(app?.hrInterviewTime) && (
                        <span className='font-[Poppins] text-center'>Scheduled</span>
                      )}
                    </TableCell>

                    <TableCell style={{ fontFamily: "Poppins", textAlign: "center" }}>
                      <div className='flex justify-center items-center space-x-5'>
                        {(app.status === 4) && (
                          <>
                            <button className='cursor-pointer' onClick={() => { handleStatus(app._id, 5) }}>
                              <img src={Check} alt="Approve" />
                            </button>
                            <button className='cursor-pointer' onClick={() => { handleStatus(app._id, -5) }}>
                              <img src={Reject} alt="Reject" />
                            </button>
                          </>
                        )}

                        {(app.status === -5) && (
                          <span className='text-sm font-[Poppins] font-medium text-[#FF3D00]'>Rejected</span>
                        )}

                        {(app.status > 4) && (
                          <span className='text-sm font-[Poppins] font-medium text-[#6BB46E]'>Success</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredApps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Interview Date & Time"
            type="datetime-local"
            fullWidth
            value={interviewDateTime}
            onChange={(e) => setInterviewDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Google Meet Link"
            type="url"
            fullWidth
            value={gmeetLink}
            onChange={(e) => setGmeetLink(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error">Cancel</Button>
          <Button sx={{zIndex : 5}} onClick={handleScheduleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AppHr;
