import RequestFuelList from './RequestFuelList';

export const RequestFuelListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/all_request_fuel',
            component: RequestFuelList
        }
    ]
};