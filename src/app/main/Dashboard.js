import React from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import Widget from './Widget';
import {withStyles} from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

const styles = () => ({
    layoutRoot: {},
    widget:{
        textDecoration: 'none'
    }
});

const Dashboard = (props) =>{
    const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    return (
        <div className="w-full">
            {(!isLogin) && (<Redirect to='/login'/>) } 
            <FuseAnimate animation="transition.slideUpIn" delay={200}>
                <div className="flex flex-col md:flex-row sm:p-8 container">
                    <div className="flex flex-1 flex-col min-w-0">
                        <FuseAnimate delay={600}>
                            <Typography className="p-16 pb-8 text-18 font-300">
                                How are your active users trending over time?
                            </Typography>
                        </FuseAnimate>
                        <div className="flex flex-col sm:flex sm:flex-row pb-32">
                            <div className="widget flex w-full sm:w-1/3 p-16">
                                <Link to="/driver" style={{textDecoration:'none'}}>
                                    <Widget key="1" head="Conversion" body="Drivers" foot="50%" />
                                </Link>
                            </div>
                            <div className="widget flex w-full sm:w-1/3 p-16">
                                <Link to="/vehicle" style={{textDecoration:'none'}}>
                                    <Widget key="2" head="Conversion" body="Vehicles" foot="50%" />
                                </Link>
                            </div>
                            <div className="widget w-full sm:w-1/3 p-16">
                                <Link to="/request" style={{textDecoration:'none'}}>
                                    <Widget key="3" head="Conversion" body="Requests" foot="50%"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>    
            </FuseAnimate>
        </div>
    )
}

export default withStyles(styles, {withTheme: true})(Dashboard);