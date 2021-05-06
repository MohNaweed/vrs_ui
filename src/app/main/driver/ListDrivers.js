import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import MaterialTable from 'material-table';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';



import * as Actions from '../../store/actions/main';


const styles = theme => ({
    layoutRoot: {}
});

const ListDrivers = (props) =>{
    const [selectedRow, setSelectedRow] = useState(null);
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.main.driver.drivers);
    const [mainLoading, setMainLoading] = useState([true]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/drivers")
          .then(res => {
            dispatch(Actions.set_drivers(res.data));
            setMainLoading(false);
          })
          .catch(error=>{
            setErrorMessages(["Cannot load user data"]);
            setIserror(true);
          })
    }, [dispatch])
    const columns = [
        { 
            title: "id", 
            field: "id", 
            hidden: true,
            validate: rowData => rowData.name.length > 3? 'Name cannot be empty' : ''
        },
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Mobile', field: 'mobile' },
        { title: 'License No', field: 'licenseno' },
        { title: 'License Exp', field: 'licenseexp'},
        { title: 'NIN', field: 'nin' },
        { 
            title: 'Province', 
            field: 'province',
            lookup: provinces_all
        },
        { title: 'Branch', field: 'branch'},

      ];

    //CRUD Functions
    const handleRowAdd = (newData, resolve, reject) => { 
        if(newData.name !== ' ')
            
        console.log(newData);
        reject();
    }
    const handleRowDelete = (oldData, resolve, reject) => { 
        console.log(oldData);
        resolve(); 
    }
    const handleRowUpdate = (newData, oldData, resolve, reject) => { 
        console.log(oldData, newData);
        resolve();
    }
    // end of CRUD functions
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
                    {mainLoading && (<LinearProgress />)}
                    
                    <MaterialTable 
                        title='Drivers Details'
                        columns={columns} 
                        data={
                            drivers.map(data => ({
                                id : data.id,
                                name : data.name,
                                surname: data.last_name,
                                mobile: data.mobile_no,
                                licenseno : data.license_no,
                                licenseexp : data.licens_expiry_date,
                                nin: data.NIN,
                                province: data.province,
                                branch : data.branch_no
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
                                handleRowUpdate(newData, oldData, resolve,reject);
                            }),
                            onRowAdd: (newData) =>
                                new Promise((resolve,reject) => {
                                handleRowAdd(newData, resolve,reject)
                            }),
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