const navigationConfig = [
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
        'id'      : 'Management',
        'title'   : 'Management',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
           
            {
                'id'   : 'listDrivers-component',
                'title': 'Drivers Management',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/driver'
            },
            {
                'id'   : 'listVehicles-component',
                'title': 'Vehicle Management',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/vehicle'
            },
            {
                'id'   : 'departments-component',
                'title': 'Department',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/department'
            },
            {
                'id'   : 'location-component',
                'title': 'Add Location',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/location'
            }
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
                'title': 'Request',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/all_request'
            },
            {
                'id'   : 'all_request_fuel-component',
                'title': 'Request List Fuel',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/all_request_fuel'
            },
            {
                'id'   : 'request-component',
                'title': 'Request Vehicle',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/request'
            },
            {
                'id'   : 'requestfuel-component',
                'title': 'Request Fuel',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/request_fuel'
            },
            
        ]
    }
];

export default navigationConfig;
