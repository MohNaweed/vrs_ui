import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import MaterialTable from 'material-table';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';



import * as Actions from '../../store/actions/main';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


const styles = theme => ({
    layoutRoot: {}
});
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing(1),
      color: 'red'
    },
  }));

const ListDrivers = (props) =>{
    const classes = useStyles();
    //const [selectedRow, setSelectedRow] = useState(null);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.main.driver.drivers);
    const vehicles = useSelector(state => state.main.vehicle.vehicles);
    const [mainLoading, setMainLoading] = useState([true]);
    const [open, setOpen] = React.useState(false);
    const [lookupData, setLookupData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/drivers")
          .then(res => {
            dispatch(Actions.setDrivers(res.data));
            setMainLoading(false);
          })
          .catch(error=>{
            setErrorMessages(["Connection Lost"]);
            setIserror(true);
            setMainLoading(false);
          })
    }, [dispatch])

    useEffect(()=>{
      axios.get("http://localhost:8000/api/v1/vehicles")
      .then(res => {
        let mylookupData = {};
         for(var i = 0; i < res.data.length ; i++){ 
          mylookupData[res.data[i].id] =res.data[i].vehicle_no;
         }
         setLookupData(mylookupData);
        //console.log(mylookupData);
      })
    },[])


    const fetchLookupData = () =>{
      axios.get("http://localhost:8000/api/v1/vehicles")
      .then(res => {
        let mylookupData = {};
         for(var i = 0; i < res.data.length ; i++){ 
          mylookupData[res.data[i].id] =res.data[i].vehicle_no;
         }
         setLookupData(mylookupData);
        console.log(mylookupData);
      })
    }


    const columns = [
        { 
            title: "id", 
            field: "id", 
            hidden: true,
            validate: rowData => rowData.name.length > 3? 'Name cannot be empty' : ''
        },
        { title: 'Name*', field: 'name' },
        { title: 'Surname', field: 'last_name' },
        { title: 'Mobile*', field: 'mobile_no' },
        { title: 'License No', field: 'license_no' },
        { title: 'License Exp', field: 'license_expiry_date'},
        { title: 'Vehicle' , 
          field :'vehicle', 
          //lookup: {1:20 , 2:40}
          lookup:lookupData
        },
        { title: 'NIN', field: 'NIN' },


        

      ];

    //CRUD Functions
    const handleRowAdd = (newData, resolve, reject) => { 
        setMainLoading(true);
        axios.post("http://localhost:8000/api/v1/drivers", newData)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.addDriver(newData));
            setMainLoading(false);
          })
          .catch(error=>{
            setErrorMessages(["Connection Lost"]);
            setIserror(true);
            setMainLoading(false);
          })
        resolve();       
    }
    const handleRowDelete = (oldData, resolve, reject) => { 
        setMainLoading(true);
        axios.delete(`http://localhost:8000/api/v1/drivers/${oldData.id}`)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.delDriver(oldData));
            setMainLoading(false);
          })
          .catch(error=>{
            setErrorMessages(["Connection Lost"]);
            setIserror(true);
            setMainLoading(false);
          })
        resolve();  
    }
    const handleRowUpdate = (newData, oldData, resolve, reject) => { 
      console.log(newData);
        setMainLoading(true);
        axios.put(`http://localhost:8000/api/v1/drivers/${newData.id}`, newData)
          .then(res => {
            //console.log(res.data);
            // dispatch(Actions.putDriver(newData));
            // setMainLoading(false);


            axios.get("http://localhost:8000/api/v1/drivers")
            .then(res => {
              dispatch(Actions.setDrivers(res.data));
              setMainLoading(false);
            })
            .catch(error=>{
              setErrorMessages(["Connection Lost"]);
              setIserror(true);
              setMainLoading(false);
            })
          
          })
          .catch(error=>{
            setErrorMessages(["Connection Lost"]);
            setIserror(true);
            setMainLoading(false);
          })

      
        resolve();  
    }
    // end of CRUD functions
    //validation
    const isValidate = (newData)=>{
        if(newData.name === undefined || newData.mobile_no === undefined || newData.name === null || newData.mobile_no === null){
          
            const newError = [];
            newError.push('Please fill the required fields');
            setErrorMessages(newError);
            setIserror(true);
    
            return false;
        }
    
        return true;
    }
    //end of validation

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      }
    
    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Drivers Dashboard</h4></div>
            }
            content={
                <div className="p-24">
                    {iserror && (errorMessages.map((err,index) => 
                        <Chip
                        key={index}
                        icon={<ErrorOutlineIcon />}
                        label={err}
                        className={classes.chip}
                        variant="outlined"
                        />
                        ))
                    }


                        
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        ContentProps={{
                        'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Note archived</span>}
                        action={[
                        <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                        ]}
                    />
                    {mainLoading && (<LinearProgress />)}
                    
                    <MaterialTable 
                        title='Drivers Details'
                        columns={columns} 
                        data={
                            drivers.map(data => ({
                                id : data.id,
                                name : data.name,
                                last_name: data.last_name,
                                mobile_no: data.mobile_no,
                                license_no : data.license_no,
                                license_expiry_date : data.license_expiry_date,
                                vehicle: data.vehicle_id,
                                NIN: data.NIN,
                                
                            }))
                        } 
                        
                        // onRowClick={(evt, selectedRow) =>
                        //     //setSelectedRow(selectedRow.tableData.id)
                        // }
                        options={{
                          exportButton:true,
                           
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve,reject) => {
                                
                                  isValidate(newData) ? handleRowUpdate(newData, oldData, resolve,reject) : reject();
                                
                            }),
                            onRowAdd: (newData) =>
                                new Promise((resolve,reject) => {
                                    
                                  isValidate(newData) ? handleRowAdd(newData, resolve,reject) : reject();
                            }),
                            onRowAddCancelled: (rowData)=> console.log('yessss'),
                            onRowUpdateCancelled : (rowData)=> setErrorMessages([]),
                            onRowDelete: (oldData) =>
                                new Promise((resolve,reject) => {
                                handleRowDelete(oldData, resolve,reject)
                            }),
                        }}
                 
                    />
                    
                  
                </div>
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(ListDrivers);





