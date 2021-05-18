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

const ListVehicles = (props) =>{
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.main.vehicle.vehicles);
    const [mainLoading, setMainLoading] = useState([true]);
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/vehicles")
          .then(res => {
            dispatch(Actions.setvehicles(res.data));
            setMainLoading(false);
          })
          .catch(error=>{
            setErrorMessages(["Connection Lost"]);
            setIserror(true);
            setMainLoading(false);
          })
    }, [dispatch])
    const columns = [
        { 
            title: "id", 
            field: "id", 
            hidden: true,
            validate: rowData => rowData.name.length > 3? 'Name cannot be empty' : ''
        },
        { title: 'Vehicle No*', field: 'vehicle_no' },
        { title: 'Model', field: 'model' },
        { title: 'Color*', field: 'color' },
        { title: 'Plate', field: 'plate' },
        { title: 'Chassis No', field: 'chassis_no'},
        { title: 'Type', field: 'type' },
        { title: 'Driver', field: 'driver_id' },
        { 
            title: 'Province', 
            field: 'province',
            lookup: provinces_all
        },
        { title: 'Branch', field: 'branch_no'},

      ];

    //CRUD Functions
    const handleRowAdd = (newData, resolve, reject) => { 
        setMainLoading(true);
        axios.post("http://localhost:8000/api/v1/vehicles", newData)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.addvehicle(newData));
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
        axios.delete(`http://localhost:8000/api/v1/vehicles/${oldData.id}`)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.delvehicle(oldData));
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
        setMainLoading(true);
        axios.put(`http://localhost:8000/api/v1/vehicles/${newData.id}`, newData)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.putvehicle(newData));
            setMainLoading(false);
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
        if(newData.vehicle_no === undefined || newData.color === undefined || newData.vehicle_no === null || newData.color === null){
          
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
                <div className="p-24"><h4>vehicles Dashboard</h4></div>
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
                        title='vehicles Details'
                        columns={columns} 
                        data={
                            vehicles.map(data => ({
                                id : data.id,
                                vehicle_no : data.vehicle_no,
                                model: data.model,
                                color: data.color,
                                plate : data.plate,
                                chassis_no : data.chassis_no,
                                //driver_id : data.driver_id,
                                type: data.type,
                                province: data.province,
                                branch_no : data.branch_no
                            }))
                        } 
                        
                        onRowClick={(evt, selectedRow) =>
                            setSelectedRow(selectedRow.tableData.id)
                        }
                        options={{
                            exportButton :true,
                            rowStyle: rowData => ({
                              backgroundColor:
                                selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                            })
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve,reject) => {
                                  handleRowUpdate(newData, oldData, resolve,reject)
                                
                                //isValidate(newData) ? handleRowUpdate(newData, oldData, resolve,reject) : reject();
                                
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

export default withStyles(styles, {withTheme: true})(ListVehicles);









const provinces_all = {
	'Badakhshan': 'Badakhshan',
	'Badghis': 'Badghis',
	'Baghlan': 'Baghlan',
	'Balkh': 'Balkh',
	'Bamyan': 'Bamyan',
	'Daykundi': 'Daykundi',
	'Farah': 'Farah',
	'Faryab': 'Faryab',
	'Ghazni': 'Ghazni',
	'Ghor': 'Ghor',
	'Helmand': 'Helmand',
	'Herat': 'Herat',
	'Jowzjan': 'Jowzjan',
	'Kabul': 'Kabul',
	'Kandahar': 'Kandahar',
	'Kapisa': 'Kapisa',
	'Khost': 'Khost',
	'Kunar': 'Kunar',
	'Kunduz': 'Kunduz',
	'Laghman': 'Laghman',
	'Logar': 'Logar',
	'Maidan_Wardak': 'Maidan_Wardak',
	'Ningarhar':'Ningarhar',
	'Nimruz':'Nimruz',
	'Nuristan':'Nuristan',
	'Paktia':'Paktia',
	'Paktika':'Paktika',
	'Panjshir':'Panjshir',
	'Parwan':'Parwan',
	'Samangan':'Samangan',
	'Sar_e_pol' :'Sar_e_pol',
	'Takhar':'Takhar',
	'Uruzgan':'Uruzgan',
	'Zabul':'Zabul'
}