import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {RequestConfig} from 'app/main/example/RequestConfig';
import ListDrivers from 'app/main/driver/ListDrivers';
// import Request from '../main/Request'

const routeConfigs = [
    RequestConfig,
    ExampleConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/request',
        component: RequestConfig.component
    },
    {
        path     : '/driver',
        component: ListDrivers
    },
    {
        path     : '/example',
        component: () => <Redirect to="/example"/>
    }
];

export default routes;
