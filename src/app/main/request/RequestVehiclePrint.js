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

//   function createDriverData(name, mobileNo, licenseNo, licenseExp) {
//     return { name, mobileNo, licenseNo, licenseExp };
//   }
  
//   const driverRow = [
//     createDriverData('Driver2 driver', '073423422', '3242342', '2021/5'),
//   ];
  
//   function createVehicleData(vehicleNo, model, plate, color) {
//     return { vehicleNo, model, plate, color };
//   }
  
//   const vehicleRow = [
//     createVehicleData('342','Corolla 2010', '(-5) 343343', 'Red'),
//   ];

export const RequestVehiclePrint = React.forwardRef((props, ref) => {
    const classes = useStyles();

    const history = useHistory();
    const {req} = history.location.state;
    return (

        <div ref={ref} className={classes.container}>
            <div className={[classes.box, classes.box1].join(' ')}>
                <div className={classes.box1child}>
                    <div>
                        <img style={{width:80, height:80}} src="assets/images/logos/vrsweblogo.png" alt="logo"/>
                        <p className={classes.text} style={{margin:5}}><b>#vrs{req.id}</b></p>
                    </div>
                </div>
                <div className={classes.box1child2}>
                    <span className={classes.title}>Vehicle Request Bill</span>
                </div>
                <div className={classes.box1child}>
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
                </div>
                <hr />
            </div>
        
            <div className={[classes.box, classes.box2].join(' ')}>
                <div className={classes.box2child}>
                    <p className={classes.passengerText}>Request For:</p>
                    <p className={classes.passengerText}><b>{req.passenger_name}</b></p>
                    <div className={classes.contentBox}>
                        <div className={classes.contentBoxLabel}>
                            <p className={classes.passengerText}>From:</p>
                        </div>
                        <div className={classes.contentBoxText}>
                            <p className={classes.passengerText}>{req.source_location.state},{req.source_location.province}</p>
                        </div>
                    </div>
                    <div className={classes.contentBox}>
                        <div className={classes.contentBoxLabel}>
                            <p className={classes.passengerText}>To:</p>
                        </div>
                        <div className={classes.contentBoxText}>
                            <p className={classes.passengerText}>{req.destination_location.state},{req.destination_location.province}</p>
                        </div>
                    </div>
                    <div className={classes.contentBox}>
                        <div className={classes.contentBoxLabel}>
                            <p className={classes.passengerText}>Contact:</p>
                        </div>
                        <div className={classes.contentBoxText}>
                            <p className={classes.passengerText}>{req.passenger_contact}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.box2child}>
                    <p className={classes.passengerText}><b>Time:</b></p>
                    <div className={classes.contentBox}>
                        <div className={classes.contentBoxLabel}>
                            <p className={classes.passengerText}>Travel on:</p>
                        </div>
                        <div className={classes.contentBoxText}>
                            <p className={classes.passengerText}>{req.travel_time}</p>
                        </div>
                    </div>
                    <div className={classes.contentBox}>
                        <div className={classes.contentBoxLabel}>
                            <p className={classes.passengerText}>Return on:</p>
                        </div>
                        <div className={classes.contentBoxText}>
                            <p className={classes.passengerText}>{req.return_time}</p>
                        </div>
                    </div>
                    <p className={classes.passengerText}>.............................................................</p>
                    <p className={classes.passengerText}><b>Comment:</b></p>
                    <p className={classes.passengerText}>{req.comment}</p>
                </div>
                <div className={classes.box2child}>
                <p className={classes.passengerText}><b>Purpose:</b></p>
                <p className={classes.passengerText}>{req.purpose}</p>
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
                {req.approves.map(app=>(
                    <div key={app.id} className={classes.box6child}>
                        <div>
                            <p className={classes.smallText}>{app.department.name} Department</p>
                            <EditAttributes />
                            <p className={classes.smallText}>{app.updated_at}</p>
                        </div>
                    </div>

                ))}
            </div>
        </div>

        
        // <div ref={ref}>
        //     <Card>
        //         <CardContent >
        //             {/* <div className={classes.cardholder}>
        //                 <div className={classes.smallCard}>
        //                     <p><b>Passenger Details:</b></p>
        //                     <p>Name: {req.passenger_name}</p>
        //                     <p>Contact: {req.passenger_contact}</p>                                
        //                 </div>
        //                 <div className={classes.locationcard}>
        //                     <p><b>Location Details:</b></p>
        //                     <p>Source Address: {req.source}</p>
        //                     <p>Destination Address: {req.destination}</p>
        //                 </div>
        //                 <div className={classes.smallCard}>                               
        //                     <p><b>Time Details:</b></p>
        //                     <p>Travel: {req.travel_time}</p>
        //                     <p>Return: {req.return_time}</p>                                 
        //                 </div>
        //             </div>
        //             <hr />
        //             {req.approves.map((app) => { 
        //                 return <div key={app.id}>
        //                 <Chip
        //                     style={{ margin: 5,backgroundColor:app.approved ? "lightGreen" : "orange"}}
                            
        //                     label={app.approved ? `Approved by ${app.department} on ${app.updated_at}` : `Pending For ${app.department} Approve`}
        //                     // onClick={handleClick}
        //                     // onDelete={handleDelete}
        //                     className={classes.chip}
                        
        //                 />
        //                 </div>
                        
        //             })}  */}
        //         </CardContent>
        //     </Card>
        // </div>
    )
  })