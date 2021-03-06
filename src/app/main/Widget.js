import React from 'react';
import {Card, Typography} from '@material-ui/core';


function Widget(props)
{
    return (
        <Card className="w-full rounded-8 shadow-none border-1">
            <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
                <div className="pr-16">
                    <Typography className="h3" color="textSecondary">{props.head}</Typography>
                    <Typography className="text-56 font-300 leading-none mt-8">
                        {props.body}
                    </Typography>
                </div>
                <div className="py-4 text-16 flex flex-row items-center">
                    <div className="flex flex-row items-center">              
                        <Typography>{props.foot}</Typography>
                    </div>
                    <Typography className="ml-4 whitespace-no-wrap">of target</Typography>
                </div>
            </div>
        </Card>
    );
}

export default React.memo(Widget);
