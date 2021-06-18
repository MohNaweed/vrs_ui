import React, {useState} from 'react';
import {Badge,Menu,MenuItem, Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, Typography} from '@material-ui/core';
//import {SendIcon, DraftsIcon, InboxIcon} from '@material-ui/icons';
import {NotificationsActive, NotificationsNoneOutlined } from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {Link} from 'react-router-dom';
import * as Actions from 'app/sanctum-auth/store/actions';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function UserMenu(props)
{
    const [redirect,setRedirect] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    const logoutHandler = () =>{
        axios.post('http://localhost:8000/logout')
        .then(res2 =>{
          dispatch(Actions.logoutSuccess());

          setRedirect(true);
        })

        
    }

    //Notification
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
      window.scrollTo(0,0); 
    }

    return (
        <React.Fragment>
            <div style={{cursor:'pointer', marginTop:20, marginRight:20}}>
            <Badge badgeContent={4} color="primary">
        
                <NotificationsActive onClick={handleClick}  />
                </Badge>
                

                {/* <NotificationsNoneOutlined></NotificationsNoneOutlined> */}
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
                    <MenuItem >
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Sent mail" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem>
                    <Avatar style={{marginRight: 10}} className="" alt="user photo" src={user.data.photoURL}/>
                    <ListItemText primary="Inbox" />
                    </MenuItem>
                </Menu>
                </div>
            {redirect && <Redirect to="/login" />}
            <Button className="h-64" onClick={userMenuClick}>
                {user.data.photoURL ?
                    (
                        <Avatar className="" alt="user photo" src={user.data.photoURL}/>
                    )
                    :
                    (
                        <Avatar className="">
                            {user.data.displayName[0]}
                        </Avatar>
                    )
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
            </Popover>
        </React.Fragment>
    );
}

export default UserMenu;
