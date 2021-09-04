import React,{useEffect } from 'react';
import axios from 'axios';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { LinearProgress} from '@material-ui/core';
//import { Slide} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import * as Actions from '../../store/actions/main';
import  ShowFuelRequest  from './requestfuel-components/ShowFuelRequest';
import {Link} from 'react-router-dom';
import {MAINURL} from '../../MAINURL';
//import { RequestVehiclePrint } from './RequestVehiclePrint';

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
const OwnFuelRequests = (props) =>{
    const baseURl = MAINURL;
    const classes = useStyles();
    const dispatch = useDispatch();
    const ownFuelRequests = useSelector(state => state.main.allFuelRequest.ownFuelRequests);
    const [showLoading, setShowLoading] = React.useState(true);
    useEffect(()=>{
        axios.get(baseURl+'/api/v1/requestfuel')
            .then(res=>{
                console.log(res.data);
                dispatch(Actions.setOwnFuelRequests(res.data));
                setShowLoading(false);
                
            })
            .catch(err => console.log('error:',err));
    },[dispatch])


    return (
        <>
        
            {showLoading &&
                <LinearProgress /> 
                               
                            }
            {ownFuelRequests.length > 0 &&
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell>Request#</StyledTableCell>
                    <StyledTableCell>Driver</StyledTableCell>
                    <StyledTableCell align="right">Distance KM</StyledTableCell>
                    <StyledTableCell align="right">Fuel Type</StyledTableCell>
                    <StyledTableCell align="right">Fuel Quantity</StyledTableCell>
                    <StyledTableCell align="right">View</StyledTableCell>
                    <StyledTableCell align="right">Print</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {ownFuelRequests.map(row => (
                    <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            #frs{row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.driver.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.distance_km}</StyledTableCell>
                        <StyledTableCell align="right">{row.fuel_type}</StyledTableCell>
                        <StyledTableCell align="right">{row.fuel_quantity}</StyledTableCell>
                        <StyledTableCell align="right"><ShowFuelRequest request={row} /></StyledTableCell>
                        <StyledTableCell align="right">
                        <Link to={{
                            pathname: 'fuel_print',
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

export default OwnFuelRequests;




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