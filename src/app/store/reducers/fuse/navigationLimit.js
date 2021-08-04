export function adminNavigation(){
    return [
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
                },
                {
                    'id'   : 'gasstation-component',
                    'title': 'Add Gasstation',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/gasstation'
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
                    'title': 'Vehicle Requests',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/all_request'
                },
                {
                    'id'   : 'all_request_fuel-component',
                    'title': 'Fuel Requests',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/all_request_fuel'
                },
                {
                    'id'   : 'request-component',
                    'title': ' Make Vehicle Request',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/request'
                },        
            ]
        },
         
    ]
   
}

export function securityNavigation(){
    return [
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
                    'title': 'Vehicle Requests',
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
                },  
            ]
        },
         
    ]
}

export function transportNavigation(){
    return [
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
                },
                {
                    'id'   : 'gasstation-component',
                    'title': 'Add Gasstation',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/gasstation'
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
                    'title': 'Vehicle Requests',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/all_request'
                },
                {
                    'id'   : 'all_request_fuel-component',
                    'title': 'Fuel Requests ',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/all_request_fuel'
                },
                {
                    'id'   : 'request-component',
                    'title': 'Make Vehicle Request',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/request'
                },
                
            ]
        },
         
    ] 
}

export function driverNavigation(){
    return [
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
                    'id'   : 'gasstation-component',
                    'title': 'Add Gasstation',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/gasstation'
                },
                {
                    'id'   : 'requestfuel-component',
                    'title': 'Request Fuel',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/request_fuel'
                },
                {
                    'id'   : 'own-fuel-request-component',
                    'title': 'My Requests',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/own_fuel_request'
                },
                {
                    'id'   : 'driver_relevant_requests',
                    'title': 'Vehicle Requests',
                    'type' : 'item',
                    'icon' : 'assignment',
                    'url'  : '/driver_relevant_reqeusts'
                },
                
                
            ]
        },
         
    ]
}