import React, {useState} from 'react';
import {Badge,Menu,MenuItem, Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, Typography} from '@material-ui/core';
//import {SendIcon, DraftsIcon, InboxIcon} from '@material-ui/icons';
import {NotificationsActive, NotificationsNoneOutlined } from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {Link} from 'react-router-dom';
import * as Actions from 'app/sanctum-auth/store/actions';
import axios from 'axios';
//import {Redirect} from 'react-router-dom';
import Echo from 'laravel-echo';
import Pusher, { Channel } from 'pusher-js';
import {MAINURL} from '../../MAINURL';


function UserMenu(props)
{

    axios.defaults.withCredentials = true; 
    const baseURL = MAINURL;
    const [redirect,setRedirect] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    const unreadNotificationsCount = useSelector(({sanctumAuth}) => sanctumAuth.login.user.unreadNotificationsCount);
    const notifications = useSelector(({sanctumAuth}) => sanctumAuth.login.user.notifications);


 

    const [userMenu, setUserMenu] = useState(null);
    const echo  =  new Echo({
    broadcaster: 'pusher',
    key: 'b711517b3faed74cffe2',
    cluster: "ap2",
    forceTLS: true  ,
    encrypted : true,
    withCredentials : true,
  //authEndpoint: 'http://localhost:8000/broadcasting/auth',
    authorizer: (channel,options) =>{
      return {
        authorize: (socketId,callback) => {
          axios.post(baseURL + '/api/broadcasting/auth', {
            socket_id: socketId
            , channel_name: channel.name
          })
          .then(res =>{
            callback(false,res.data);
          })
          .catch(err => {
            callback(true,err);
          })
        }
      }
    }
    });
  
  
  echo.private(`App.Models.User.${mainUser.id}`).notification((data) => {
      //dispatch(Actions.pushNotification(data));
    //   console.log('from private',data);
    //   setUnReadNotificationStateCount(unReadNotificationStateCount + 1);
    fetchNotifications();
 
  });
  

  const fetchNotifications = () =>{
    axios.get(baseURL + '/api/v1/notifications/all')
        .then(res=>{
            console.log(res.data);
            dispatch(Actions.setNotifications(res.data[0],res.data[1]));
        })
        .catch(e =>{
            console.log(e);
        })
  }





    

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    const logoutHandler = () =>{
        axios.post(baseURL + '/logout')
        .then(res2 =>{
          dispatch(Actions.logoutSuccess());

          setRedirect(true);
        })

        
    }

    //Notification
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
      axios.post(baseURL + '/api/v1/notifications/markasread')
        .then(res=>{
            dispatch(Actions.markAsRead());
        })
        .catch(e =>{
            console.log(e);
        })
    }
  
    function handleClose() {
      setAnchorEl(null);
      window.scrollTo(0,0); 
    }
    return (
        <React.Fragment>
            {/*
            {Object.keys(mainUser).length !== 0 &&
                <div style={{cursor:'pointer', marginTop:20, marginRight:20}}>
                    {notifications.length === 0 &&
                        <NotificationsNoneOutlined onClick={handleClick}></NotificationsNoneOutlined>
                    }
                    {(notifications.length > 0 && unreadNotificationsCount > 0) &&
                        <Badge badgeContent={unreadNotificationsCount} color="primary">
                            <NotificationsActive onClick={handleClick}  />
                        </Badge>
                    }
                    {(notifications.length > 0 && unreadNotificationsCount === 0) &&
                        <NotificationsActive onClick={handleClick}  /> 
                    }
                    <Menu
                        style={{cursor:'pointer', marginTop:45}}
                        id="customized-menu"
                        anchorEl={anchorEl}
                        //keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                            maxHeight: window.innerHeight - (window.innerHeight * 50) / 100,
                            //width: '20ch',
                            },
                        }}
                    >
                        {(Object.keys(mainUser).length !== 0) ? notifications.map((not,index) => (
                            <MenuItem key={index}>
                            <Avatar style={{marginRight: 10}}>{not.data.requestData.user.name.substring(0,2)}</Avatar>
                                <Link to="all_request" style={{ textDecoration: 'none' }}><ListItemText primary={not.data.requestData.status === 'clear' ?  "Your vehicle request has been approved":not.data.requestData.user.name  + " is requested vehicle for " + not.data.requestData.passenger_name } /></Link>
                            </MenuItem>

                        )):
                        <MenuItem>
                            <ListItemText primary="No Notification to display" />
                        </MenuItem>
                        }
                        {
                        notifications.length === 0 && 
                            <MenuItem>
                                <ListItemText primary="No Notification to display" />
                            </MenuItem>   
                        }
                    
                    
                    </Menu>
                </div>
            }
            <Button className="h-64" onClick={userMenuClick}>
               
                        {mainUser.name && 
                            <Avatar className="">
                                {mainUser.name.substring(0, 2)}
                            </Avatar>
                        }
                
                

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {mainUser.name ? mainUser.name : 'Admin'}
                    </Typography>
                    <Typography className="text-11 capitalize" color="textSecondary">
                        {user.role.toString()}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical  : 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                {!user.role || user.role.length === 0 ? (
                    <React.Fragment>
                        {isLogin && <MenuItem onClick={(e)=>logoutHandler(e)}>
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>}
                        {(!isLogin) && <MenuItem component={Link} to="/login">
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Login"/>
                        </MenuItem>}
                        <MenuItem component={Link} to="/create_user">
                            <ListItemIcon className="min-w-40">
                                <Icon>person_add</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Register"/>
                        </MenuItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile"/>
                        </MenuItem>
                        <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Inbox"/>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                dispatch(authActions.logoutUser());
                                userMenuClose();
                            }}
                        >
                            <ListItemIcon className="min-w-40">
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout"/>
                        </MenuItem>
                    </React.Fragment>
                )}
                        </Popover> */}
        </React.Fragment>
    );
}

export default UserMenu;
