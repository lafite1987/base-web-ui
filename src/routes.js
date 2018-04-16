import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Board from './views/board/Board.vue'

import User from './views/user/User.vue'
import UserAdd from './views/user/UserAdd.vue'
import UserUpdate from './views/user/UserUpdate.vue'

import Role from './views/role/Role.vue'

let routes = [{
    path: '/login',
    component: Login,
    name: '',
},
{
    path: '/404',
    component: NotFound,
    name: '',
},
{
    path: '/',
    component: Home,
    redirect: '/board',
    name: '工作看板',
    children: [{
        path: '/board',
        component: Board,
        name: '工作看板',
        children: [
        ]
    }]
},
{
    path: '/',
    component: Home,
    name: '系统管理',
    children: [{
            path: '/user',
            component: User,
            name: '用户管理',
            children: [{
                path: 'add',
                component: UserAdd,
                name: 'userAdd',
                alias: '添加用户'
            },
            {
                path: ':id/update',
                component: UserUpdate,
                name: 'userUpdate',
                alias: '更新用户'
            }]
        }, {
            path: '/role',
            component: Role,
            name: '角色管理',
            children: []
        }
    ]
}, 
{
    path: '*',
    redirect: {
        path: '/404'
    }
}
];

export default routes;