import React, {useState, useRef, useEffect} from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import {useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { Redirect, Link } from 'react-router-dom';


const Login = (props) =>{
    axios.defaults.withCredentials = true;
    const baseURL = "http://localhost:8000";
    const classes = useStyles();

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.sanctumAuth.login.success);

    const inputEmail = useRef(null);
    const [isEmailError,setIsEmailError] = useState(false);
    const [email, setEmail ] = useState('');
    const [emailErrorMsg, setEmailErrorMsg ] = useState('');

    const inputPass = useRef(null);
    const [isPassError,setIsPassError] = useState(false);
    const [pass, setPass ] = useState('');
    const [passErrorMsg, setPassErrorMsg ] = useState('');
    const [isLogingError,setIsLogingError] = useState(false);
    const [showLoading,setShowLoading] = useState(false);

    useEffect(()=>{
      axios.post(baseURL+"/logout").then(res=> console.log('logout successssss'));

    },[])

    const emailHandler = (e)=>{
      setEmail(e.target.value);
      if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.current.value)){
        setIsEmailError(false)
        setEmailErrorMsg('');
      }else{
        setIsEmailError(true)
        setEmailErrorMsg('Invalid Email');
      }
    }
    const passHandler = (e)=>{
      setPass(e.target.value);
      if(inputPass.current.value === '' || inputPass.current.value.length < 6){
        setIsPassError(true)
        setPassErrorMsg('Invalid Password');
      }else{
        setIsPassError(false)
        setPassErrorMsg('');
      }
    }

    const loginHandler = async () => {
        if(emailErrorMsg !== ''  || passErrorMsg !== ''){
            console.log('wrong credentials');
            
        }else{
          setShowLoading(true);
          try
          {
            
            await axios.get(baseURL+'/sanctum/csrf-cookie');
            await axios.post(baseURL+"/login",{email,password:pass});
            const res3 = await  axios.get(baseURL+'/api/user');
            const user = res3.data;
            console.log(user);
            dispatch(Actions.loginSuccess(user));
            
          }
          catch(error)
          {
            setIsLogingError(true);
            setShowLoading(false);
          }
                          
        }
        
    } 

    const testHandler = ()=>{
      console.log('test handler called');
      axios.get('/public/test')
        .then(res => console.log(res.data))
        .catch(err =>console.log(err));
    }
    
    
    
    return (
        <div className={classes.gridContainer}>
          {isLogin && <Redirect to="/" />}
            <Card >
              { showLoading && <LinearProgress />}
                <CardContent className={classes.gridCard}>
                    <h2 className={classes.title1}>Login Form</h2>
                    { isLogingError && <Chip
                      style={{color:'red',margin:10}} 
                      icon={<ErrorOutlineIcon />}
                      label='Invalid Login Attempt'
                      className={classes.chip}
                      variant="outlined"
                    /> }
                    <TextField 
                        error={isEmailError}
                        required
                        className={classes.item} 
                        id="email" 
                        label="Email" 
                        variant="filled"
                        helperText={emailErrorMsg}
                        inputRef={inputEmail}
                        value={email}
                        onChange={(e)=> emailHandler(e)}
                     />
                    <TextField
                        error={isPassError} 
                        required
                        className={classes.item} 
                        id="password" 
                        label="Password" 
                        variant="filled" 
                        type="password"
                        autoComplete="current-password"
                        helperText={passErrorMsg}
                        inputRef={inputPass}
                        value={pass}
                        onChange={(e)=> passHandler(e)}
                    />
                    <Button 
                        className={classes.item} 
                        size="small"
                        onClick={()=> loginHandler()}
                    >Sign in</Button>
                    <Link to="/create_user" >
                      <Button 
                          className={classes.item} 
                          size="small"
                          onClick={()=> console.log('pressed sign up')}
                      >Sign up</Button>
                    </Link>
                    <Button 
                        className={classes.item} 
                        size="small"
                        onClick={()=> {
                          document.cookie = "laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=http://localhost:3000;";
                        }}
                    >clear cookies</Button>
                    <Button 
                        className={classes.item} 
                        size="small"
                        onClick={()=> {
                          testHandler();
                        }}
                    >test</Button>
                </CardContent>
            </Card>
        </div>
        
      );
    }

export default Login;


//Component styles

const useStyles = makeStyles(theme => ({
  root: {
 
  },
  gridContainer:{
      width: '100%',
      display: 'grid',
      'grid-template-columns': 'auto'  ,
      'justify-content': 'space-around',
      'align-content': 'space-around',
      'background-color': 'rgb(38,41,51)',
      padding: '50px'
      
  },
  gridCard :{
    display: 'grid',
    'grid-template-columns': 'auto'  ,
    'justify-content': 'space-around',
    'align-content': 'space-between',
   
    //border: '1px solid red',
    

  },
  item:{
    margin: 10,
    color: '#2196F3',
    //border: '1px solid red', 
  },
  title1 : {
    color: '#2196F3',
    textAlign: 'center',
 


  }

}));