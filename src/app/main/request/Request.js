import React, {useEffect,useState} from 'react';
import {Redirect} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Switch, MenuItem, FormControlLabel, InputLabel, FormControl, Select, Button} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../store/actions/main';

import axios from 'axios';
const styles = theme => ({
    layoutRoot: {}
});


const Request = (props) =>{
    const baseURl = 'http://localhost:8000';
    const classes = useStyles();

    //states
    const [purpose, setPurpose] = useState(''); 
    const [source, setSource] = React.useState({id: '',});
    const [destination, setDestination] = React.useState({id: '',});
    const [passengerName, setPassengerName] = useState(''); 
    const [passengerContact, setPassengerContact] = useState(''); 
    const [travelTime, setTravelTime] = useState(''); 
    const [returnTime, setReturnTIme] = useState(''); 
    const [isReturn, setIsReturn] = useState(true); 
    const [canDriverAdd,setCanDriverAdd] = useState(false);
    const [driver, setDriver] = React.useState({id: '',});

    //get Current user
    const currentUser = useSelector(state => state.sanctumAuth.login.user);
    useEffect(()=>{
        if(Object.keys(currentUser).length !== 0){
            if(currentUser.department.name === 'Administration' || (currentUser.department_position === 'head' && currentUser.department.name === 'Transport')){
                setCanDriverAdd(true);
            }
        }
    },[currentUser])

    //change handlers
    function handleChangePurpose(event){ setPurpose(event.target.value);}
    function handleChangePassengerName(event){ setPassengerName(event.target.value);}
    function handleChangePassengerContact(event){ setPassengerContact(event.target.value);}
    function handleChangeTravelTime(event){ setTravelTime(event.target.value);}
    function handleChangeReturnTime(event){ setReturnTIme(event.target.value);}

    function handleChangeSource(event) {
      setSource(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    }

    function handleChangeDestination(event) {
      setDestination(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    }
    function handleChangeDriver(event) {
      setDriver(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    }

    const handleChange = name => event => {
        setIsReturn(event.target.checked);
    };

    const submitHandler = () =>{
        const dataBundle = {
            purpose, source_id:source.id, destination_id:destination.id, passengerName, passengerContact, travelTime, returnTime, isReturn 
        }
        axios.post(baseURl+'/api/v1/requests',{...dataBundle})
            .then(res=>{
                console.log(res.data);
                setPurpose('');
                setPassengerName('');
                setPassengerContact('');
            })
            .catch(err => console.log('error:',err))
        console.log(dataBundle);
    }

    //others
    const dispatch = useDispatch();
    const locations = useSelector(({main}) => main.location.locations);
    const drivers = useSelector(({main}) => main.driver.drivers);

    useEffect(()=>{
         axios.get(baseURl+'/api/v1/locations')
            .then(res=>{
                dispatch(Actions.setLocations(res.data));
            })
            .catch(err => console.log('error:',err));

         axios.get(baseURl+'/api/v1/drivers')
            .then(res=>{
                dispatch(Actions.setDrivers(res.data));
            })
            .catch(err => console.log('error:',err))
    },[dispatch])

    const isLogin = useSelector(state => state.sanctumAuth.login.success);
    //const [submitForm, setSubmitForm]
    return (
        <>
         {(!isLogin) && (<Redirect to='/login'/>) } 
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="pt-5 pl-5"><h4>Request Page</h4></div>
            }
            content={
                <div className="p-24">
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.fullwidth} >  
                            <TextField
                                id="standard-full-width"
                                label="Purpose"
                                placeholder="Type your request purpose"
                                value={purpose}
                                onChange={handleChangePurpose}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="location" >From/Source Address</InputLabel>
                            <Select
                           
                            value={source.id}
                            onChange={handleChangeSource}
                            inputProps={{
                                name: 'id',
                               
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locations.map(data =>{
                                return <MenuItem key={data.id} value={data.id}>{data.state}</MenuItem>
                            })}
                            
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="location" >To/Destination Address</InputLabel>
                            <Select
                           
                            value={destination.id}
                            onChange={handleChangeDestination}
                            inputProps={{
                                name: 'id',
                               
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locations.map(data =>{
                                return <MenuItem key={data.id} value={data.id}>{data.state}</MenuItem>
                            })}
                            
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="passenger_name"
                                label="Passenger Name"
                                placeholder="Passenger Name"
                                value={passengerName}
                                onChange={handleChangePassengerName}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="passenger contact"
                                label="Passenger Contact"
                                placeholder="Passenger Contact"
                                value={passengerContact}
                                onChange={handleChangePassengerContact}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="travel_time"
                                label="Travel Time"
                                type="datetime-local"
                                value={travelTime}
                                onChange={handleChangeTravelTime}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        {isReturn && <FormControl className={classes.formControl}>
                            <TextField
                                id="return_time"
                                label="Return Time"
                                type="datetime-local"
                                value={returnTime}
                                onChange={handleChangeReturnTime}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>}
                        {canDriverAdd && <FormControl className={classes.formControl}>
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
                        <div className={classes.bottom}>
                        <FormControl className={classes.bottomChild}>
                            <FormControlLabel
                                control={
                                    <Switch
                                    checked={isReturn}
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                }
                                label="Return"
                            />
                        </FormControl>

                        <FormControl className={classes.bottomChild}>
                            <Button variant="outlined" color="primary" onClick={submitHandler}>Send Request</Button>
                        </FormControl>

                        </div>
                    </form>
                   
                </div>
            }
        />
        </>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent :'space-between'
    },
    formControl: {
        margin: theme.spacing(1),
        flexBasis: '400px',
        flex: 1,
    },
    fullwidth:{
        margin: theme.spacing(1),
        flexBasis: '100%'
    },
    bottom:{
        margin: theme.spacing(1),
        flexBasis: '100%',
        display:'flex',
        justifyContent: 'space-between'
    },
    bottomChild:{
        flexBasis: '200px',

    }
  }));

export default withStyles(styles, {withTheme: true})(Request);