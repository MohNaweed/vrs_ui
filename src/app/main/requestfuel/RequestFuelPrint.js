import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {EditAttributes} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
const useStyles = makeStyles({
    // root: {
    //     width: '100%',
    //     marginTop: 10,
    //     overflowX: 'auto',
    //   },
    //   table: {
    //     minWidth: 650,
    //   },
    text:{
        
    },
    smallText:{
        fontSize: '1.3vw'
    },
    passengerText:{
        fontSize:'2vw'
    },
    title:{
        fontSize:'3.8vw',
        fontFamily: 'cursive'
    },
    container:{
      
        display: 'flex',
        padding:30,
        flexDirection: 'column',
        height: 780
    },
    box:{
        flex:5,
    
        //border: '1px solid red',
    
    },
    box1:{
        display: 'flex',
       // width:'100%'
    },
    box3:{
        flex:1,
        //border: '1px solid red',
        backgroundColor : '#E3C57D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

   
    }, 
    box4:{
        flex:3,
    
        //border: '1px solid red',
    
    },
    box5:{
        flex:3,
    
        //border: '1px solid red',
    
    },
    box6:{
        flex:5,
    
        //border: '1px solid red',
        display : 'flex'
    
    },
    box6child:{
        flex: 1,
        //border: '1px solid blue',
        display : 'flex',
        justifyContent: 'center',
        alignItems :'center'
    },
    
    box1child:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        
        //alignItems: 'center',
    },
    box1child2:{
        flex:3,
        display: 'flex',
        //alignSelf:  'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box2 :{
        display: 'flex'

    },
    box2child:{
        flex:1,
        border: '0.5px solid black',
        padding: 10
    },
    insideBox:{
        display: 'flex',
        flexDirection: 'row'
    },
    insideBoxLabels:{
        flex: 3
    },
    insideBoxContents:{
        flex:7
    },
    contentBox:{
        display: 'flex',
    },
    contentBoxLabel:{
        flex: 4
    },
    contentBoxText:{
        flex:7
    }


  });
export const RequestFuelPrint = React.forwardRef((props, ref) => {
    const classes = useStyles();

    const history = useHistory();
    const {req} = history.location.state;
    return (
        <div ref={ref} className={classes.container}>
        <div className={[classes.box, classes.box1].join(' ')}>
            <div className={classes.box1child}>
                <div>
                    <img style={{width:80, height:80}} src="assets/images/logos/vrsweblogo.png" alt="logo"/>
                    <p className={classes.text} style={{margin:5}}><b>#frs{req.id}</b></p>
                </div>
            </div>
            <div className={classes.box1child2}>
                <span className={classes.title}>Fuel Request Bill</span>
            </div>
            {/* <div className={classes.box1child}>
                <p className={classes.smallText}><b>Requester Details:</b></p>
                <div className={classes.insideBox}>
                    <div className={classes.insideBoxLabels}>
                        <p className={classes.smallText}>Name:</p>
                        <p className={classes.smallText}>Dep:</p>
                        <p className={classes.smallText}>Email:</p>
                        <p className={classes.smallText}>Date:</p>
                    </div>
                    <div className={classes.insideBoxContents}>
                        <p className={classes.smallText}>{req.user.name}</p>
                        <p className={classes.smallText}>{req.user.department_position === 'Head' ? 'Head of '+req.user.department.name+' Department': req.user.department.name+' Department'} </p>
                        <p className={classes.smallText}>{req.user.email}</p>
                        <p className={classes.smallText}>{req.created_at}</p>
                    </div>
                </div>
            </div> */}
            <hr />
        </div>
    
        <div className={[classes.box, classes.box2].join(' ')}>
            <div className={classes.box2child}>
                <p className={classes.passengerText}>Driver Name:</p>
                <p className={classes.passengerText}><b>{req.driver.name}</b></p>
                <div className={classes.contentBox}>
                    <div className={classes.contentBoxLabel}>
                        <p className={classes.passengerText}>Fuel Type:</p>
                    </div>
                    <div className={classes.contentBoxText}>
                        <p className={classes.passengerText}>{req.fuel_type}</p>
                    </div>
                </div>
                <div className={classes.contentBox}>
                    <div className={classes.contentBoxLabel}>
                        <p className={classes.passengerText}>DistanceKM:</p>
                    </div>
                    <div className={classes.contentBoxText}>
                        <p className={classes.passengerText}>{req.distance_km}</p>
                    </div>
                </div>
                {/* <div className={classes.contentBox}>
                    <div className={classes.contentBoxLabel}>
                        <p className={classes.passengerText}>Contact:</p>
                    </div>
                    <div className={classes.contentBoxText}>
                        <p className={classes.passengerText}>{req.passenger_contact}</p>
                    </div>
                </div> */}
            </div>
            <div className={classes.box2child}>
                <p className={classes.passengerText}><b>Fuel:</b></p>
                <div className={classes.contentBox}>
                    <div className={classes.contentBoxLabel}>
                        <p className={classes.passengerText}>Quantity:</p>
                    </div>
                    <div className={classes.contentBoxText}>
                        <p className={classes.passengerText}>{req.fuel_quantity}</p>
                    </div>
                </div>
                <div className={classes.contentBox}>
                    <div className={classes.contentBoxLabel}>
                        <p className={classes.passengerText}>Price:</p>
                    </div>
                    <div className={classes.contentBoxText}>
                        <p className={classes.passengerText}>{req.fuel_price + ' AF'}</p>
                    </div>
                    
                </div>
                <p className={classes.passengerText}>.............................................................</p>
                <p className={classes.passengerText}><b>Total:</b></p>
                <p className={classes.passengerText}>{(req.fuel_price * req.fuel_quantity) + ' AF'}</p>
            </div>
            <div className={classes.box2child}>
            <p className={classes.passengerText}><b>Gas Station:</b></p>
            <p className={classes.passengerText}>{req.gasstation.name}</p>
            <p className={classes.passengerText}>{req.gasstation.address}</p>
            <p className={classes.passengerText}>{req.gasstation.contact}</p>
            </div>
        </div>
        <div className={classes.box3}>
            <p>Details</p>
        </div>
        {req.driver &&
        <div className={classes.box4}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Driver Name</TableCell>
                    <TableCell >Mobile#</TableCell>
                    <TableCell >License#</TableCell>
                    <TableCell >License Exp</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell component="th" scope="row">
                        {req.driver.name}
                    </TableCell>
                    <TableCell >{req.driver.mobile_no}</TableCell>
                    <TableCell >{req.driver.license_no}</TableCell>
                    <TableCell >{req.driver.license_expiry_date}</TableCell>
                    </TableRow>
              
                </TableBody>
            </Table>
        </div>}
        { req.driver &&
        <div className={classes.box5}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Vehicle#</TableCell>
                    <TableCell >Model</TableCell>
                    <TableCell >Plate</TableCell>
                    <TableCell >Color</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
               
                    <TableRow >
                    <TableCell component="th" scope="row">
                        {req.driver.vehicle.vehicle_no}
                    </TableCell>
                    <TableCell >{req.driver.vehicle.model}</TableCell>
                    <TableCell >{req.driver.vehicle.plate}</TableCell>
                    <TableCell >{req.driver.vehicle.color}</TableCell>
                    </TableRow>
         
                </TableBody>
            </Table>
        </div>}
        <div className={classes.box6}>
                <div key={req.approve.id} className={classes.box6child}>
                    <div>
                        <p className={classes.smallText}>{req.approve.department.name} Department</p>
                        <EditAttributes />
                        <p className={classes.smallText}>{req.approve.updated_at}</p>
                    </div>
                </div>
        </div>
    </div>

    )
  })