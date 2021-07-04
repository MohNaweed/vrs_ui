import React, {useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import { makeStyles } from '@material-ui/core/styles';
import {Print} from '@material-ui/icons';
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
      <>
        <button onClick={handlePrint}><Print fontSize="large" /></button>
        <RequestVehiclePrint ref={componentRef} />
      </>
       
    )
}

export default withStyles(styles, {withTheme: true})(ListDrivers);




