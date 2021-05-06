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
                            search: false,
                            rowStyle: rowData => ({
                              backgroundColor:
                                selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                            })
                          }} 
                    
                    
                    
                    
                    
                    
                    
                    />
                  
                </div>
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(ListDrivers);