import Request from './Request';

export const RequestConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/request',
            component: Request
        }
    ]
};