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


const RequestFuel = (props) =>{
    const classes = useStyles();
    const [source, setSource] = React.useState({
      id: '',
      
    });
    const [destination, setDestination] = React.useState({
      id: '',
      
    });
    const [isReturn, setIsReturn] = useState(true); 
    const handleChange = name => event => {
    setIsReturn(event.target.checked);

    console.log(isReturn);
    };
  
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
    const dispatch = useDispatch();
    const locations = useSelector(({main}) => main.location.locations);

    useEffect(()=>{
         axios.get('http://localhost:8000/api/v1/locations')
            .then(res=>{
                dispatch(Actions.setLocations(res.data));
            })
            .catch(err => console.log('error:',err))
    },[dispatch])

    useEffect(()=>{
        console.log(source);
    },[source])
    //const isLogin = useSelector(state => state.sanctumAuth.login.success);
    return (
        <>
        {/* {(!isLogin) && (<Redirect to='/login'/>) } */}
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="pt-5 pl-5"><h4>Request Fuel Page</h4></div>
            }
            contentToolbar={
                <div className="px-24"><h4>Request Fuel Toolbar</h4></div>
            }
            content={
                <div className="p-24">
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.fullwidth} >  
                            <TextField
                                id="standard-full-width"
                                label="Purpose"
                                placeholder="Type your request purpose"
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
                                return <MenuItem key={data.id} value={data.id}>{data.address}</MenuItem>
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
                                return <MenuItem key={data.id} value={data.id}>{data.address}</MenuItem>
                            })}
                            
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="passenger_name"
                                label="Passenger Name"
                                placeholder="Passenger Name"
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
                                defaultValue="{date}"
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
                                defaultValue="{new date()}"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
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
                            <Button variant="outlined" color="primary">Send Request</Button>
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

export default withStyles(styles, {withTheme: true})(RequestFuel);