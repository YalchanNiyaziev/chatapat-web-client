import Login from "../screens/Login";
import {Register} from "../screens/Register";
import Home from "../screens/Home";
import ChatHome from "../screens/ChatHome";

export const permittedAllRoutes = {
    base: {
       path: '/',
       key: 'home',
       component: Home,
    },
    login: {
        path: '/login',
        key: 'login',
        component: Login,
    },
    register: {
        path: '/register',
        key: 'register',
        component: Register,
    },
    forgotPass: {
        path: '/reset-password',
        key: 'resetPassword',
        component: '',
    }
};

export const authenticatedRoutes = {
    main: {
      path: '/chat',
      key: 'main',
      component: ChatHome,
    },
    // chatUser: {
    //     path: '/chat/connection',
    //     key: 'chatConnection',
    //     component: 'No component yet',
    // },
    // userProfile: {
    //   path: '/chat/user/profile',
    //   key: 'userProfile',
    //   component: 'No component yet',
    // },
    // editProfile: {
    //     path: '/chat/user/profile/edit',
    //     key: 'editProfile',
    //     component: 'No component yet',
    // },
}