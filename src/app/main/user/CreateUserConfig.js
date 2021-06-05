import CreateUser from './CreateUser';

export const CreateUserConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/create_user',
            component: CreateUser
        }
    ]
};