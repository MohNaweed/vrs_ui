import React, {useEffect,useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
// import {Redirect} from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux';
// import * as Actions from '../../store/actions/main';
import axios from 'axios';
const styles = theme => ({
    layoutRoot: {}
});


const RequestFuel = (props) =>{
    const classes = useStyles();
    const baseURl = 'http://localhost:8000';
    const [PKM, setPKM] = useState(''); 
    const [CKM, setCKM] = useState(''); 
    const [SKM, setSKM] = useState(''); 
    const [fuelType, setFuelType] = useState('petrol');

    function PKMHandler(event){ setPKM(event.target.value); }
    function CKMHandler(event){ setCKM(event.target.value); }
    function SKMHandler(event){ setSKM(event.target.value); }
    function handleFuelTypeChange(event) { setFuelType(event.target.value);}

    useEffect(()=>{
        setSKM(CKM - PKM);
    },[CKM, PKM])

    function submitHandler(){
        axios.post(baseURl+'/api/v1/requestfuel',{SKM, fuelType})
            .then(res=>{
                console.log(res.data);
                setPKM('');
                setCKM('');
                setSKM('');
                setFuelType('');
            })
            .catch(err => console.log('error:',err));
    }


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
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="1"
                                label="Previous KM"
                                placeholder="Previous KM"
                                value={PKM}
                                onChange={PKMHandler}
                                type="number"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="2"
                                label="Current KM"
                                placeholder="Current KM"
                                value={CKM}
                                onChange={CKMHandler}
                                type="number"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="3"
                                label="Spend KM"
                                placeholder="Spend KM"
                                value={SKM}
                                onChange={SKMHandler}
                                type="number"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl component="fieldset"  className={classes.fullwidth}>
                            <FormLabel component="legend">Fuel Type</FormLabel>
                            <RadioGroup
                            aria-label="gender"
                            name="gender2"
                            className={classes.group}
                            value={fuelType}
                            onChange={handleFuelTypeChange}
                            >
                            <FormControlLabel
                                className={classes.radio}
                                value="petrol"
                                control={<Radio color="primary" />}
                                label="Petrol"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value="diesal"
                                control={<Radio color="primary" />}
                                label="Diesal"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                className={classes.radio}
                                value="gaz"
                                control={<Radio color="primary" />}
                                label="Gaz"
                                labelPlacement="start"
                            />
                           
                            </RadioGroup>
                
                        </FormControl>
                        <FormControl className={classes.bottomChild}>
                            <Button variant="outlined" color="primary" onClick={submitHandler}>Send Request</Button>
                        </FormControl>
                        
                       
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
        flexBasis: '300px',
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
        margin: theme.spacing(1),
        flexBasis: '200px',

    },
    group:{
        display: 'flex',
       
        flexDirection: 'row'
    },
    radio:{
        flex : 1,
     
    }
  }));

export default withStyles(styles, {withTheme: true})(RequestFuel);