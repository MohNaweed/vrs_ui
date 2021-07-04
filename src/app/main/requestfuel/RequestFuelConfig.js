import RequestFuel from './RequestFuel';

export const RequestFuelConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/request_fuel',
            component: RequestFuel
        }
    ]
};