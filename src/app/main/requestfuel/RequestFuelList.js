import React,{useState,useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { TextField ,Avatar, Chip, Card,  FormControl, CardContent, Button, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import * as Actions from '../../store/actions/main';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    cardholder:{
        display: 'flex'
    },
    smallCard:{
        flex: 1,
        margin : 5
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
    const requests = useSelector(state => state.main.allFuelRequest.allFuelRequest);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
    const [requestID,setRequestID] = useState(0);
    const [approveID,setApproveID] = useState(0);

    function handleChangeQuantity(event){ setQuantity(event.target.value);}
    function handleChangePrice(event){ setPrice(event.target.value);}



    useEffect(()=>{
        
        if(Object.keys(mainUser).length !== 0){
            if(mainUser.department.name ==='Administration' || (mainUser.department.name === 'Transport' && mainUser.department_position === 'head')){
                setIsAdmin(true);
               
            }
            
        }

    },[mainUser])
 

    

    useEffect(()=>{
    
        axios.post(baseURl+'/api/v1/requests/fuel/all')
           .then(res=>{
               console.log(res.data);
               dispatch(Actions.setAllFuelRequest(res.data));
           })
           .catch(err => console.log('error:',err));
    },[dispatch])


    const submitApprove = (e) =>{
        setOpen(false);
        axios.post(baseURl+'/api/v1/requests/fuel/approved',{requestID,approveID,quantity, price})
           .then(res=>{
            axios.post(baseURl+'/api/v1/requests/fuel/all')
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
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Pending and Approved Fuel Requests</h4></div>
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
                                        {/* {req.driver.name} */}
                                    </Avatar>
                                )
                            }

                            <div className="hidden md:flex flex-col ml-12 items-start">
                                <Typography component="span" className="normal-case font-600 flex">
                                    {/* {req.driver.name} */}
                                </Typography>
                            </div>
                            

                        </Button>
                    
                        <CardContent >
                            <div className={classes.cardholder}>
                                <div className={classes.smallCard}>
                                    <p><b>Fuel Details:</b></p>
                                    <p>Distance (KM): {req.distance_km}</p>
                                    <p>Fuel Type: {req.fuel_type}</p>                                
                                </div>
                            </div>
                            <hr />
                            {req.approves.map((app) => {
                                   
                                return <div key={app.id}>
                                <Chip
                                    style={{ margin: 5,backgroundColor:app.approved ? "lightGreen" : "orange"}}
                                    
                                    label={app.approved ? `Approved by Administration on ${app.updated_at}` : `Pending For Administration Approve`}
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
                               
                            })} 
                        </CardContent>
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