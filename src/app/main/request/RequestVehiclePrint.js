import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import { InputLabel,  MenuItem, Select ,Avatar, Chip, Card,  FormControl, CardContent, Button, Typography} from '@material-ui/core';
const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardholder:{
        display: 'flex'
    },
    smallCard:{
        flex: 1,
        margin : 5
    },
    locationcard:{
        flex:2
    }
  });

export const RequestVehiclePrint = React.forwardRef((props, ref) => {
    const classes = useStyles();
    // ...
    
    React.useEffect(()=>{
        //console.log(props)
    },[props])

    const history = useHistory();
    const {req} = history.location.state;
    return (
        <div ref={ref}>
            <Card>
                <CardContent >
                    <div className={classes.cardholder}>
                        <div className={classes.smallCard}>
                            <p><b>Passenger Details:</b></p>
                            <p>Name: {req.passenger_name}</p>
                            <p>Contact: {req.passenger_contact}</p>                                
                        </div>
                        <div className={classes.locationcard}>
                            <p><b>Location Details:</b></p>
                            <p>Source Address: {req.source}</p>
                            <p>Destination Address: {req.destination}</p>
                        </div>
                        <div className={classes.smallCard}>                               
                            <p><b>Time Details:</b></p>
                            <p>Travel: {req.travel_time}</p>
                            <p>Return: {req.return_time}</p>                                 
                        </div>
                    </div>
                    <hr />
                    {req.approves.map((app) => { 
                        return <div key={app.id}>
                        <Chip
                            style={{ margin: 5,backgroundColor:app.approved ? "lightGreen" : "orange"}}
                            
                            label={app.approved ? `Approved by ${app.department} on ${app.updated_at}` : `Pending For ${app.department} Approve`}
                            // onClick={handleClick}
                            // onDelete={handleDelete}
                            className={classes.chip}
                        
                        />
                        </div>
                        
                    })} 
                </CardContent>
            </Card>
        </div>
    )
  })