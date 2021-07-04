import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Done} from '@material-ui/icons';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide, Card, CardContent, Chip, FormControl} from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        width: '100%',
        //margin: theme.spacing(2),
        //marginRight: theme.spacing(2),
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShowRequest = (props) => {
    const classes = useStyles();
    const req = props.request;
    //const [showRequest, setShowRequest] = useState({});
    const [show, setShow] = React.useState(false);

    function handleShowClickOpen() {
      setShow(true);
      //setShowRequest();
      console.log(props);
   
    }
  
    function handleShowClose() {
      setShow(false);
     // setShowRequest({});
     
    }


  return (
    <div>
      <Button onClick={()=>{handleShowClickOpen()}}> Show</Button>



      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShowClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">{"Request Approvable Model"}</DialogTitle>
        <DialogContent>

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
                {req.approves.map((app) => (
                    <div key={app.id}>
                    <Chip
                        style={{ margin: 5,backgroundColor:app.approved ? "lightGreen" : "orange"}}
                        
                        label={app.approved ? `Approved by ${app.department.name} on ${app.updated_at}` : `Pending For ${app.department.name} Approve`}
                        // onClick={handleClick}
                        // onDelete={handleDelete}
                        className={classes.chip}
                    
                        deleteIcon={<Done />}
                    />
                    </div>
                    
                ))} 
            </CardContent>
        
        </DialogContent>
        <DialogActions>
        </DialogActions>
        </Dialog>
    </div>
    
  );
};

export default ShowRequest;