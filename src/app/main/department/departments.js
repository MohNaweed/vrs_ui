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
import {MAINURL} from '../../MAINURL';


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

const Departments = (props) =>{
    const baseURL = MAINURL;
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const departments = useSelector(state => state.main.department.departments);
    const [mainLoading, setMainLoading] = useState([true]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        axios.get(baseURL + "/api/v1/departments")
          .then(res => {
            dispatch(Actions.setDepartments(res.data));
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
        { title: 'Name*', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Employees Count', field: 'employees_count' },

      ];

    //CRUD Functions
    const handleRowAdd = (newData, resolve, reject) => { 
        setMainLoading(true);
        axios.post(baseURL + "/api/v1/departments", newData)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.addDepartment(newData));
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
        axios.delete(baseURL + `/api/v1/departments/${oldData.id}`)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.delDepartment(oldData));
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
        axios.put(baseURL + `/api/v1/departments/${newData.id}`, newData)
          .then(res => {
            console.log(res.data);
            dispatch(Actions.putDepartment(newData));
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
        if(newData.name === undefined || newData.name === null){
          
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
                <div className="p-24"><h4>departments Dashboard</h4></div>
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
                        title='departments Details'
                        columns={columns} 
                        data={
                            departments.map(data => ({
                                id : data.id,
                                name : data.name,
                                description: data.description,
                                employees_count: data.employees_count,
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

export default withStyles(styles, {withTheme: true})(Departments);
