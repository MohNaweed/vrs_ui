import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import PendingFuelRequests from './requestfuel-components/PendingFuelRequests';
import ClearedFuelRequests from './requestfuel-components/ClearedFuelRequests';
//import OwnRequests from './request-components/OwnRequests';
import RequestFuelDetails from './RequestFuelDetails';
import {BottomNavigation, BottomNavigationAction,Paper} from '@material-ui/core';
import { DoneAll, Person, Opacity} from '@material-ui/icons';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});


const RequestFuelList = (props) =>{
   
    
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
                                to="/all_request_fuel"
                                label="Pending Requests" 
                                icon={<Opacity />} 
                            />
                            <BottomNavigationAction 
                                component={Link}

                                to="/cleared_fuel_request"
                                label="Cleared Requests" 
                                icon={<DoneAll />} 
                            />
                            {/* <BottomNavigationAction 
                                component={Link}
                                to="/own_request"
                                label="My Requests" 
                                icon={<Person />} 
                            /> */}
                          
                        </BottomNavigation>
                    </Paper>
                    <div>
                        <Switch>
                            <Route exact path="/all_request_fuel">
                                <PendingFuelRequests />
                            </Route>
                            <Route exact path="/cleared_fuel_request">
                                <ClearedFuelRequests />
                            </Route>
                            {/* <Route path="/own_request">
                                <OwnRequests />
                            </Route> */}
                            <Route path="/fuel_print">
                                <RequestFuelDetails />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                
            }
        />
    )
}

export default RequestFuelList;