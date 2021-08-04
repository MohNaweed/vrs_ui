import React,{useEffect } from 'react';
import axios from 'axios';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { LinearProgress} from '@material-ui/core';
//import { Slide} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import * as Actions from '../../store/actions/main';
import  ShowRequest  from '../request/request-components/ShowRequest';
import {Link} from 'react-router-dom';
//import { RequestVehiclePrint } from './RequestVehiclePrint';

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
const DriverRelevantRequests = (props) =>{
    const baseURl = 'http://localhost:8000';
    const classes = useStyles();
    const dispatch = useDispatch();
    //const user = useSelector(({auth}) => auth.user);
    //const mainUser = useSelector(({sanctumAuth}) => sanctumAuth.login.user);
    //const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
    //const driverRelevantRequests = useSelector(state => state.main.allRequest.driverRelevantRequests);
    const [showLoading, setShowLoading] = React.useState(true);
    const [driverRelevantRequests, setDriverRelevantRequests] = React.useState([]);


    // useEffect(()=>{
        
    //     if(Object.keys(mainUser).length !== 0){
    //         if(mainUser.department.name ==='Administration' || (mainUser.department.name === 'Transport' && mainUser.department_position === 'head')){
    //             setIsAdmin(true);
    //             setCanDriverAdd(true);
    //         }   
            
    //     }

    // },[mainUser])

 
    useEffect(()=>{
        console.log('hihi');
        axios.post(baseURl+'/api/v1/requests/vehicle/driver')
            .then(res=>{
                console.log('hi2hi2');
                console.log(res.data);
                setDriverRelevantRequests(res.data);
                setShowLoading(false);
                
            })
            .catch(err => console.log('error:',err));
    },[dispatch])


    return (
        <>
            {showLoading &&
                <LinearProgress /> 
                               
                            }
            {driverRelevantRequests.length > 0 &&
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell>Request#</StyledTableCell>
                    <StyledTableCell>Requester Name</StyledTableCell>
                    <StyledTableCell align="right">Passenger Name</StyledTableCell>
                    <StyledTableCell align="right">Travel Time</StyledTableCell>
                    <StyledTableCell align="right">View</StyledTableCell>
                    <StyledTableCell align="right">Print</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {driverRelevantRequests.map(row => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            #vrs{row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.user.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.passenger_name}</StyledTableCell>
                        <StyledTableCell align="right">{row.travel_time}</StyledTableCell>
                        <StyledTableCell align="right"><ShowRequest request={row} /></StyledTableCell>
                        <StyledTableCell align="right">
                        <Link to={{
                            pathname: 'vehicle_print',
                            state:{
                                req:row
                            }
                        }}> Print View</Link>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            }
           
        </>
    )
}

export default DriverRelevantRequests;




const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: 'black',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //margin: theme.spacing(2),
        //marginRight: theme.spacing(2),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
  }));