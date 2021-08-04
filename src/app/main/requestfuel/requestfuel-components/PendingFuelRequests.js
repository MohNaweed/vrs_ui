import React,{useState,useEffect, useRef } from 'react';
import axios from 'axios';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {InputLabel,  MenuItem, Select , TextField ,FormControl, Button, LinearProgress} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import * as Actions from '../../../store/actions/main';
//import  ShowRequest  from './ShowRequest';
//import { RequestVehiclePrint } from './RequestVehiclePrint';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const PendingRequests = (props) =>{
    const baseURl = 'http://localhost:8000';
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    const requests = useSelector(state => state.main.allFuelRequest.allFuelRequest);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
   // const [isAdmin,setIsAdmin] = useState(false);
    const [requestID,setRequestID] = useState(0);
    const [approveID,setApproveID] = useState(0);
    const [gasstation, setGasstation] = React.useState({id: '',});

    function handleChangeQuantity(event){ setQuantity(event.target.value);}
    function handleChangePrice(event){ setPrice(event.target.value);}


    function handleChangeGasstation(event) {
        setGasstation(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
    }

    const gasstations = useSelector(({main}) => main.gasstation.gasstations);

    useEffect(()=>{
         axios.get(baseURl+'/api/v1/gasstations')
            .then(res=>{
                dispatch(Actions.setGasstations(res.data));
            })
            .catch(err => console.log('error:',err))
    },[dispatch])




    useEffect(()=>{
    
        axios.post(baseURl+'/api/v1/requests/fuel/pendings')
           .then(res=>{
               console.log(res.data);
               dispatch(Actions.setAllFuelRequest(res.data));
           })
           .catch(err => console.log('error:',err));
    },[dispatch])


    const submitApprove = (e) =>{
        setOpen(false);
        axios.post(baseURl+'/api/v1/requests/fuel/approved',{requestID,approveID,quantity, price, gasStationID: gasstation.id })
           .then(res=>{
            axios.post(baseURl+'/api/v1/requests/fuel/pendings')
            .then(res=>{
                console.log(res.data);
                dispatch(Actions.setAllFuelRequest(res.data));
            })
            .catch(err => console.log('error:',err));
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
   
    return (
        <>
            {/* {showLoading &&
                <LinearProgress /> 
                               
                            } */}
            {requests.length > 0 &&
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell>Request#</StyledTableCell>
                    <StyledTableCell>Driver Name</StyledTableCell>
                    <StyledTableCell align="right">Distance KM</StyledTableCell>
                    <StyledTableCell align="right">Fuel Type</StyledTableCell>
                    {/* <StyledTableCell align="right">View</StyledTableCell> */}
                    <StyledTableCell align="right">Approve</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {requests.map(row => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            #vrs{row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.driver.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.distance_km}</StyledTableCell>
                        <StyledTableCell align="right">{row.fuel_type}</StyledTableCell>
                        {/* <StyledTableCell align="right"><ShowRequest request={row} /></StyledTableCell> */}
                        <StyledTableCell align="right">
                        {row.approve.approved === 0 &&
                            <FormControl className={classes.bottomChild}>
                                <Button onClick={()=>{handleClickOpen(row.id,row.approve.id)}}>Click to Approve</Button>
                            </FormControl>}
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
                    <FormControl style={{width: '40%', margin:'4%'}} >  
                        <TextField
                            id="quantity"
                            label="Quantity (L)"
                            placeholder="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleChangeQuantity}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl style={{width: '40%', margin:'4%'}} >  
                        <TextField
                            id="price"
                            label="Price (per L)"
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={handleChangePrice}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl style={{width: '80%', margin:'4%'}}>
                            <InputLabel htmlFor="gasstation" >Gas Station</InputLabel>
                            <Select
                           
                            value={gasstation.id}
                            onChange={handleChangeGasstation}
                            inputProps={{
                                name: 'id',
                               
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {gasstations.map(data =>{
                                return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            })}
                            
                            </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitApprove} color="primary">
                    Approved
                </Button>
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