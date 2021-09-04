import React,{useState,useEffect, useRef } from 'react';
import axios from 'axios';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {InputLabel,  MenuItem, Select ,FormControl, Button, LinearProgress} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import * as Actions from '../../../store/actions/main';
import  ShowRequest  from './ShowRequest';
import {MAINURL} from '../../../MAINURL';
//import { RequestVehiclePrint } from './RequestVehiclePrint';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const PendingRequests = (props) =>{
    const baseURl = MAINURL;
    const classes = useStyles();
    const dispatch = useDispatch();
    //const user = useSelector(({auth}) => auth.user);
    const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    //const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    const pendingRequestsToApprove = useSelector(state => state.main.allRequest.pendingRequestsToApprove);
    const [isAdmin,setIsAdmin] = useState(false);
    const [requestID,setRequestID] = useState(0);
    const [approveID,setApproveID] = useState(0);
    const [canDriverAdd,setCanDriverAdd] = useState(false);
    const [driver, setDriver] = React.useState({id: '',});
    const [showLoading, setShowLoading] = React.useState(true);


    useEffect(()=>{
        
        if(Object.keys(mainUser).length !== 0){
            if(mainUser.department.name ==='Administration' || (mainUser.department.name === 'Transport' && mainUser.department_position === 'head')){
                setIsAdmin(true);
                setCanDriverAdd(true);
            }   
            
        }

    },[mainUser])

 
    useEffect(()=>{
        axios.post(baseURl+'/api/v1/requests/all')
            .then(res=>{
                dispatch(Actions.setPendingRequestsToApprove(res.data));
                setShowLoading(false);
                
            })
            .catch(err => console.log('error:',err));
    },[dispatch])


    const submitApprove = (e) =>{
        setOpen(false);
        axios.post(baseURl+'/api/v1/requests/approved',{requestID,approveID,driverID: driver.id})
           .then(res=>{
                axios.post(baseURl+'/api/v1/requests/all')
                    .then(res=>{
                        console.log(res.data);
                        dispatch(Actions.setPendingRequestsToApprove(res.data));
                    })
                axios.post(baseURl+'/api/v1/requests/belongs')
                    .then(res=>{
                        console.log(res.data);
                        dispatch(Actions.setPendingRequests(res.data));
                    })
           })
           .catch(err => console.log('error:',err));
    }

    const [open, setOpen] = React.useState(false);

    function handleClickOpen(reqID, appID) {
      setOpen(true);
      setRequestID(reqID);
      setApproveID(appID);
    }
  
    function handleClose() {
      setOpen(false);
      setRequestID(0);
      setApproveID(0);
    }
 



    const drivers = useSelector(({main}) => main.driver.drivers);
    useEffect(()=>{
        axios.get(baseURl+'/api/v1/drivers')
           .then(res=>{
               dispatch(Actions.setDrivers(res.data));
           })
           .catch(err => console.log('error:',err))
   },[dispatch])

    function handleChangeDriver(event) {
        setDriver(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));

        console.log(driver);
    }
   
    return (
        <>
            {showLoading &&
                <LinearProgress /> 
                               
                            }
            {pendingRequestsToApprove.length > 0 &&
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell>Request#</StyledTableCell>
                    <StyledTableCell>Requester Name</StyledTableCell>
                    <StyledTableCell align="right">Passenger Name</StyledTableCell>
                    <StyledTableCell align="right">Travel Time</StyledTableCell>
                    <StyledTableCell align="right">View</StyledTableCell>
                    <StyledTableCell align="right">Approve</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {pendingRequestsToApprove.map(row => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            #vrs{row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.user.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.passenger_name}</StyledTableCell>
                        <StyledTableCell align="right">{row.travel_time}</StyledTableCell>
                        <StyledTableCell align="right"><ShowRequest request={row} /></StyledTableCell>
                        <StyledTableCell align="right">
                        {row.approves.map((app) => (
                        <div key={app.id}>
                        {(app.approved === 0 && mainUser.id === app.department_id) &&
                                <Button onClick={()=>{handleClickOpen(row.id,app.id)}}> Approve</Button>
                            }
                            </div>
                        
                        ))}
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            }
           
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Request Approvable Model"}</DialogTitle>
                <DialogContent>
                    {canDriverAdd &&
                    <DialogContentText id="alert-dialog-slide-description">
                        Please Add The Driver before Approved the request
                    </DialogContentText> }
                    {canDriverAdd && <FormControl className={classes.formControl} style={{width:'100%'}}>
                        <InputLabel htmlFor="driver" >Driver</InputLabel>
                        <Select
                    
                        value={driver.id}
                        onChange={handleChangeDriver}
                        inputProps={{
                            name: 'id',
                        
                        }}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {drivers.map(data =>{
                            return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        })}
                        
                        </Select>
                    </FormControl>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={submitApprove} color="primary">Approved</Button>
                </DialogActions>
            </Dialog>
        
        </>
    )
}

export default PendingRequests;




const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: 'orange',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //margin: theme.spacing(2),
        //marginRight: theme.spacing(2),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
  }));