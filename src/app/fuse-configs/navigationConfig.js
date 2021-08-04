// import {useSelector} from 'react-redux';
// const isLogin = useSelector(({sanctumAuth}) => sanctumAuth.login.success);
let navigationConfig = [
    {
        'id'      : 'dashboard',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
           
            {
                'id'   : 'dashboard-component',
                'title': 'Dashboard',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/dashboard'
            },
        ]
    },
    {
        'id'      : 'applications',
        'title'   : 'Requests',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
           
            {
                'id'   : 'all_request-component',
                'title': 'Vechile Requests',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/all_request'
            },
            {
                'id'   : 'request-component',
                'title': 'Make Vehicle Request',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/request'
            }
            
        ]
    }
];
if(true){
        navigationConfig.splice(1,0,
            {
                'id'      : 'Management',
                'title'   : 'Management',
                'type'    : 'group',
                'icon'    : 'apps',
                'children': [
                    {
                        'id'   : 'location-component',
                        'title': 'Add Location',
                        'type' : 'item',
                        'icon' : 'assignment',
                        'url'  : '/location'
                    }
                ]
            });
       
}

export default navigationConfig;
