import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

const styles = theme => ({
    layoutRoot: {}
});

class Example extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="pt-5 pl-5"><h4>Request Page</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Request Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <h4>Content</h4>
                        <br/>
                        <FormControl style={{paddingRight: '10px', justifyContent : 'center'}} >
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" variant="outlined"/>
                            <FormHelperText id="my-helper-text">validation message for email.</FormHelperText>
                        </FormControl>
                        <FormControl style={{paddingRight: '10px'}}>
                            <InputLabel htmlFor="my-input">LastName</InputLabel>
                            <Input id="my-input1" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">validation message for email.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Department</InputLabel>
                            <Input id="my-input2" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">validation message for email.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Button style={{marginTop:100}}>Send</Button>
                        </FormControl>
                        
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Example);