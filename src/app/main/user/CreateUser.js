import React, {useEffect,useState} from 'react';
//import {Redirect} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Switch, MenuItem, FormControlLabel, InputLabel, FormControl, Select, Button} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../store/actions/main';
import axios from 'axios';
import {MAINURL} from '../../MAINURL';
const styles = theme => ({
    layoutRoot: {}
});


const Request = (props) =>{
    const baseURl = MAINURL;
    const classes = useStyles();
    const dispatch = useDispatch();

    //states
    const [name, setName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [department, setDepartment] = React.useState({id: '',});
    const [isHead, setIsHead] = useState(false); 
    
    //change handlers
    function handleChangeName(event){ setName(event.target.value);}
    function handleChangeLastName(event){ setLastName(event.target.value);}
    function handleChangeEmail(event){ setEmail(event.target.value);}
    function handleChangePassword(event){ setPassword(event.target.value);}
    function handleChangeConfirmPassword(event){ setConfirmPassword(event.target.value);}
   
    function handleChangeDepartment(event) {
        setDepartment(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
      }

    const handleChange = name => event => {
        setIsHead(event.target.checked);
    };

    const departments = useSelector(({main}) => main.department.departments);
    useEffect(() => {
        axios.get(baseURl+"/api/v1/departments")
          .then(res => {
            dispatch(Actions.setDepartments(res.data));
          })
          .catch(error=>{
            console.log(error);
          })
    }, [dispatch])

    const submitHandler = () =>{
        const departmentPosition = isHead ? 'head' : 'normal';
        
       
        const dataBundle = {
            name, lastName, email, password, password_confirmation: confirmPassword, department_id:department.id, departmentPosition 
        }

       
        axios.post(baseURl+'/register',{...dataBundle})
            .then(res=>{
                console.log(res.data);
            })
            .catch(err => console.log('error:',err))
        console.log(dataBundle);
    }

    //others
    // const dispatch = useDispatch();
    // const users = useSelector(state => state.sanctumAuth.user.users);
   
    // useEffect(()=>{
    //      axios.get(baseURl+'/api/v1/user')
    //         .then(res=>{
    //             dispatch(Actions.setLocations(res.data));
    //         })
    //         .catch(err => console.log('error:',err))
    // },[dispatch])

    return (
        <>
        {/* {(!isLogin) && (<Redirect to='/login'/>) } */}
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="pt-5 pl-5"><h4>Request Page</h4></div>
            }
            contentToolbar={
                <div className="px-24"><h4>Request Toolbar</h4></div>
            }
            content={
                <div className="p-24">
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="name"
                                label="Name"
                                placeholder="Type User Name"
                                value={name}
                                onChange={handleChangeName}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="lastName"
                                label="LastName"
                                placeholder="Type User LastName"
                                value={lastName}
                                onChange={handleChangeLastName}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="email"
                                label="Email"
                                placeholder="Type User Email"
                                value={email}
                                onChange={handleChangeEmail}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="password"
                                label="Password"
                                placeholder="Type User Password"
                                value={password}
                                onChange={handleChangePassword}
                                type="password"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl} >  
                            <TextField
                                id="confirm_password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleChangeConfirmPassword}
                                type="password"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="department" >Department</InputLabel>
                            <Select
                           
                            value={department.id}
                            onChange={handleChangeDepartment}
                            inputProps={{
                                name: 'id',
                               
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {departments.map(data =>{
                                return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            })}
                            
                            </Select>
                        </FormControl>
                        <div className={classes.bottom}>
                        <FormControl className={classes.bottomChild}>
                            <FormControlLabel
                                control={
                                    <Switch
                                    checked={isHead}
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                }
                                label="Head"
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