import RequestFuelDetails from './RequestFuelDetails';

export const RequestFuelDetailsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/fuel_print',
            component: RequestFuelDetails
        }
    ]
};