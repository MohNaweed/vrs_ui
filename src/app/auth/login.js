import React, {useState, useRef, useEffect} from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



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

const Login = (props) =>{
    axios.defaults.withCredentials = true;
    const inputEmail = useRef(null);
    const [isEmailError,setIsEmailError] = useState(false);
    const [email, setEmail ] = useState('');
    const [emailErrorMsg, setEmailErrorMsg ] = useState('');

    const inputPass = useRef(null);
    const [isPassError,setIsPassError] = useState(false);
    const [pass, setPass ] = useState('');
    const [passErrorMsg, setPassErrorMsg ] = useState('');
    const classes = useStyles();

    //auth state
    const [isLogingSuccess,setIsLogingSuccess] = useState(false);
    

    useEffect(()=>{
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(res => {console.log(res.data)})
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

    const loginHandler = () => {
        if(emailErrorMsg !== ''  || passErrorMsg !== ''){
            console.log('wrong credentials');
            
        }else{
            
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(res => {
                    console.log(res);
                    axios.post("http://localhost:8000/login",{
                        email,
                        password:pass,
                       
                        
                    })
                    .then(res1 => {
                        console.log(res1);
                        setIsLogingSuccess(true);
                        
                    })

                })
           
            
        }
    } 

    const protectedRouteAccess = () =>{
        axios.get('http://localhost:8000/api/laravelapi')
            .then(res2 =>{
                console.log(res2);
            })
    }
    
    const logoutHandler = () =>{
        axios.post('http://localhost:8000/logout')
        .then(res2 =>{
            console.log(res2);
        })
    }
    
    return (
        <div className={classes.gridContainer}>
            {isLogingSuccess && <Redirect to='/' />}
            <Card >
                <CardContent className={classes.gridCard}>
                    <h2 className={classes.title1}>Login Form</h2>
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
                    <Button 
                        className={classes.item} 
                        size="small"
                        onClick={()=> protectedRouteAccess()}
                    >get Access to protected route</Button>
                    <Button 
                        className={classes.item} 
                        size="small"
                        onClick={()=> logoutHandler()}
                    >Logout</Button>
                </CardContent>
            </Card>
        </div>
        
      );
    }

export default Login;