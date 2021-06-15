import React,{useState,useEffect, useRef } from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { InputLabel,  MenuItem, Select ,Avatar, Chip, Card,  FormControl, CardContent, Button, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import * as Actions from '../../store/actions/main';
import {Redirect, Link, Route} from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { RequestVehiclePrint } from './RequestVehiclePrint';
const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardholder:{
        display: 'flex'
    },
    smallCard:{
        flex: 1,
        margin : 5
    },
    locationcard:{
        flex:2
    }
  });
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const RequestList = (props) =>{
    const baseURl = 'http://localhost:8000';
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    const requests = useSelector(state => state.main.allRequest.allRequest);
    const [isAdmin,setIsAdmin] = useState(false);
    const [requestID,setRequestID] = useState(0);
    const [approveID,setApproveID] = useState(0);
    const [canDriverAdd,setCanDriverAdd] = useState(false);
    const [driver, setDriver] = React.useState({id: '',});


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
               console.log(res.data);
               dispatch(Actions.setAllRequest(res.data));
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
                dispatch(Actions.setAllRequest(res.data));
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



      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
       
    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Pending and Approved Vehicle Requests</h4></div>
            }
            content={
                <>
                {(!isLogin) && (<Redirect to='/login'/>) } 
                {requests.map((req, index) => (
                   <Card key={req.id} className={classes.card}>
                        <Button className="h-64" onClick={()=>console.log('hi')}>
                            {user.data.photoURL ?
                                (
                                    <Avatar className="" alt="user photo" src={user.data.photoURL}/>
                                )
                                :
                                (
                                    <Avatar className="">
                                        {req.user.name}
                                    </Avatar>
                                )
                            }

                            <div className="hidden md:flex flex-col ml-12 items-start">
                                <Typography component="span" className="normal-case font-600 flex">
                                    {req.user.name}
                                </Typography>
                            </div>
                            

                        </Button>
                    
                        <CardContent >
                            <div className={classes.cardholder}>
                                <div className={classes.smallCard}>
                                    <p><b>Passenger Details:</b></p>
                                    <p>Name: {req.passenger_name}</p>
                                    <p>Contact: {req.passenger_contact}</p>                                
                                </div>
                                <div className={classes.locationcard}>
                                    <p><b>Location Details:</b></p>
                                    <p>Source Address: {req.source}</p>
                                    <p>Destination Address: {req.destination}</p>
                                </div>
                                <div className={classes.smallCard}>                               
                                    <p><b>Time Details:</b></p>
                                    <p>Travel: {req.travel_time}</p>
                                    <p>Return: {req.return_time}</p>                                 
                                </div>
                            </div>
                            <hr />
                            {req.approves.map((app) => {
                               
                                if(!isAdmin && app.department === 'Administration'){
                                 
                                    return '';
                                }
                                else{
                                  
                                return <div key={app.id}>
                                <Chip
                                    style={{ margin: 5,backgroundColor:app.approved ? "lightGreen" : "orange"}}
                                    
                                    label={app.approved ? `Approved by ${app.department} on ${app.updated_at}` : `Pending For ${app.department} Approve`}
                                    // onClick={handleClick}
                                    // onDelete={handleDelete}
                                    className={classes.chip}
                                
                                    deleteIcon={<DoneIcon />}
                                />{ app.approved === 0 &&
                                <FormControl className={classes.bottomChild}>
                                    <Button onClick={()=>{handleClickOpen(req.id,app.id)}}>Click to Approve</Button>
                                </FormControl>
                                }
                                </div>
                               
                            }})} 
                        </CardContent>
                        <Link to={{
                            pathname: 'vehicle_print',
                            state:{
                                req
                            }
                        }}> GO TO</Link>
                       
                    </Card> 
                ))}

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
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={submitApprove} color="primary">
                            Approved
                        </Button>
                        </DialogActions>
                    </Dialog>
                
                </>
            }
        />
    )
}

export default withStyles({withTheme: true})(RequestList);