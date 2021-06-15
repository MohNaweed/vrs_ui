import React, {useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import { makeStyles } from '@material-ui/core/styles';
import { useReactToPrint } from 'react-to-print';
import { RequestVehiclePrint } from './RequestVehiclePrint';

const styles = theme => ({
    layoutRoot: {}
});
const useStyles = makeStyles(theme => ({
 
  }));

const ListDrivers = (props) =>{
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    
    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Drivers Dashboard</h4></div>
            }
            content={
                <div>
                <RequestVehiclePrint ref={componentRef} />
                <button onClick={handlePrint}>Print this out!</button>
              </div>
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(ListDrivers);




