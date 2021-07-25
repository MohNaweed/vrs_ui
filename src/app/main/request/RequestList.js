import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import PendingRequests from './request-components/PendingRequests';
import ClearedRequests from './request-components/ClearedRequests';
import OwnRequests from './request-components/OwnRequests';
import RequestVehicleDetails from './RequestVehicleDetails';
import {BottomNavigation, BottomNavigationAction,Paper} from '@material-ui/core';
import { DoneAll, Person, Opacity} from '@material-ui/icons';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});


const RequestList = (props) =>{
    //const baseURl = 'http://localhost:8000';
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}

            content={
                <Router>
                    <Paper>
                        <BottomNavigation
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            showLabels
                            className={classes.root}
                            >
                            <BottomNavigationAction 
                                component={Link}
                                to="/all_request"
                                label="Pending Requests" 
                                icon={<Opacity />} 
                            />
                            <BottomNavigationAction 
                                component={Link}
                                to="/cleared_request"
                                label="Cleared Requests" 
                                icon={<DoneAll />} 
                            />
                            <BottomNavigationAction 
                                component={Link}
                                to="/own_request"
                                label="My Requests" 
                                icon={<Person />} 
                            />
                          
                        </BottomNavigation>
                    </Paper>
                    <div>
                        <Switch>
                            <Route path="/all_request">
                                <PendingRequests />
                            </Route>
                            <Route path="/cleared_request">
                                <ClearedRequests />
                            </Route>
                            <Route path="/own_request">
                                <OwnRequests />
                            </Route>
                            <Route path="/vehicle_print">
                                <RequestVehicleDetails />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                
            }
        />
    )
}

export default RequestList;