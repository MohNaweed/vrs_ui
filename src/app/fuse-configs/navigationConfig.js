const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
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
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'request-component',
                'title': 'Request Vehicle',
                'type' : 'item',
                'icon' : 'assignment',
                'url'  : '/request'
            }
        ]
    }
];

export default navigationConfig;
