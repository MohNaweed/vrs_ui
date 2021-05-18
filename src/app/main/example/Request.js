import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import {useSelector} from 'react-redux';
//import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import axios from 'axios';
const styles = theme => ({
    layoutRoot: {}
});


const Request = (props) =>{
    const isLogin = useSelector(state => state.sanctumAuth.login.success);

    useEffect(() => {
        axios.get("http://localhost:8000/api/laravelapi")
          .then(res => {
            console.log(res.data);
          })
          .catch(error=>{
            console.log(error);
          })
    }, []);
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
            contentToolbar={
                <div className="px-24"><h4>Request Toolbar</h4></div>
            }
            content={
                <div className="p-24">
                    <h4>Content</h4>
                    <br/>
                    <h3>from request component</h3>
                </div>
            }
        />
        </>
    )
}


export default withStyles(styles, {withTheme: true})(Request);