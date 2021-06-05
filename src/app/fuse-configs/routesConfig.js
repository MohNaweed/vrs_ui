import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {RequestConfig} from 'app/main/request/RequestConfig';
import {RequestFuelConfig} from 'app/main/request/RequestFuelConfig';
import {LocationConfig} from 'app/main/location/LocationConfig';
import {CreateUserConfig} from 'app/main/user/CreateUserConfig';
import ListDrivers from 'app/main/driver/ListDrivers';
import ListVehicles from 'app/main/vehicle/ListVehicles';
import Dashboard from 'app/main/Dashboard';
import Department from 'app/main/department/departments';
// import Request from '../main/Request'

const routeConfigs = [
    RequestConfig,
    RequestFuelConfig,
    LocationConfig,
    CreateUserConfig,
    ExampleConfig,


  
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to='/dashboard' />
    },
    {
        path     : '/dashboard',
        exact    : true,
        component: Dashboard
    },
    {
        path     : '/department',
        exact    : true,
        component: Department
    },
    {
        path     : '/driver',
        component: ListDrivers
    },
    {
        path     : '/vehicle',
        component: ListVehicles
    },
    {
        path     : '/example',
        component: () => <Redirect to="/example"/>
    }
];

export default routes;
