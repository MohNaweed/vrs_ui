import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';

const styles = theme => ({
    layoutRoot: {}
});

const Example = (props) =>{
    return (
        <FusePageSimple
            classes={{
                root: props.layoutRoot
            }}
            header={
                <div className="p-24"><h4>Header</h4></div>
            }
            contentToolbar={
                <div className="px-24"><h4>Content Toolbar</h4></div>
            }
            content={
                <div className="p-24">
                    <h4>Content</h4>
                    <br/>
                    <DemoContent/>
                </div>
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(Example);