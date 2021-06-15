import RequestVehicleDetails from './RequestVehicleDetails';

export const RequestVehicleDetailsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/vehicle_print',
            component: RequestVehicleDetails
        }
    ]
};