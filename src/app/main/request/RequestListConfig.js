import RequestList from './RequestList';

export const RequestListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/all_request',
            component: RequestList
        }
    ]
};