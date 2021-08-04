import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Done} from '@material-ui/icons';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide, CardContent, Chip} from '@material-ui/core';
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

const ShowFuelRequest = (props) => {
    const classes = useStyles();
    const req = props.request;
    //const [Fuel, setShowRequest] = useState({});
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
        <DialogTitle id="alert-dialog-slide-title">{"Fuel Request Details"}</DialogTitle>
        <DialogContent>

            <CardContent >
                <div className={classes.cardholder}>
                    <div className={classes.smallCard}>
                        <p><b>Fuel Details:</b></p>
                        <p>Id: #frs{req.id}</p>
                        <p>Type: {req.fuel_type}</p> 
                        <p>Distance KM: {req.distance_km}</p>
                        <p>Quantity: {req.fuuantity}</p> 
                        <p>Price: {req.fuel_price + ' AF'}</p> 
                        <p>Total: {(req.fuel_quantity * req.fuel_price) + ' AF'}</p>
                                                        
                    </div>
                    <div className={classes.locationcard}>
                        <p><b>Gas Station Details:</b></p>
                        <p>Gas Station Name: {req.gasstation.name}</p>
                        <p>Gas Station Address: {req.gasstation.address}</p>
                    </div>
                    <div className={classes.smallCard}>                               
                        <p><b>Vehicle Details:</b></p>
                        {/* <p>Travel: {req.travel_time}</p>
                        <p>Return: {req.return_time}</p>                                  */}
                    </div>
                </div> 
            </CardContent>
        
        </DialogContent>
        <DialogActions>
        </DialogActions>
        </Dialog>
    </div>
    
  );
};

export default ShowFuelRequest;