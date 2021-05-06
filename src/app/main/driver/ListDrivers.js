import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';

import MaterialTable from 'material-table';


const styles = theme => ({
    layoutRoot: {}
});

const ListDrivers = (props) =>{
    const [selectedRow, setSelectedRow] = useState(null);
    const columns = [
        { title: 'Title', field: 'title' },
        { title: 'Author', field: 'authors' },
        { title: 'Page Count', field: 'num_pages' },
        { title: 'Rating', field: 'rating' }
      ];

    //CRUD Functions
    const handleRowAdd = (newData, resolve) => { 
        console.log(newData);
        resolve();
    }
    const handleRowDelete = (oldData, resolve) => { 
        console.log(oldData);
        resolve(); 
    }
    const handleRowUpdate = (newData, oldData, resolve) => { 
        console.log(oldData, newData);
        resolve();
    }
    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Drivers Dashboard</h4></div>
            }
            contentToolbar={
                <div className="px-24"><h4>Drivers</h4></div>
            }
            content={
                <div className="p-24">
                    <MaterialTable 
                        columns={columns} 
                        data={[
                            {title :'new title one',authors : 'naweed', num_pages:22 , rating: 3},
                            {title :'two',authors : 'ali', num_pages:50 , rating: 33},
                        ]} 
                        title='Books Directory'
                        onRowClick={(evt, selectedRow) =>
                            setSelectedRow(selectedRow.tableData.id)
                        }
                        options={{
                            rowStyle: rowData => ({
                              backgroundColor:
                                selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                            })
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);
                            }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                handleRowAdd(newData, resolve)
                            }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                handleRowDelete(oldData, resolve)
                            }),
                        }} 
                    
                    
                    
                    
                    
                    
                    
                    />
                  
                </div>
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(ListDrivers);