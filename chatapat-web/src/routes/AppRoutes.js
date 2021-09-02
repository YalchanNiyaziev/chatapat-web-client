import Login from "../screens/Login";
import {Register} from "../screens/Register";
import Home from "../screens/Home";
import ChatHome from "../screens/ChatHome";
import NotFound from "../screens/NotFound";

export const permittedAllRoutes = {
    base: {
        path: '/',
        key: 'home',
        component: Home,
        exact: true,
    },
    notFound: {
        path: '/not-found',
        key: 'notFoundResource',
        component: NotFound,
        exact: false,
    }
}
export const unauthenticatedRoutes = {
    login: {
        path: '/login',
        key: 'login',
        component: Login,
        exact: true,
    },
    register: {
        path: '/register',
        key: 'register',
        component: Register,
        exact: true,

    },
    forgotPass: {
        path: '/reset-password',
        key: 'resetPassword',
        component: '',
        exact: true,
    }
};

export const authenticatedRoutes = {
    main: {
        path: '/chat',
        key: 'main',
        component: ChatHome,
        exact: true,

    },
    conversation: {
        path: '/chat/:conversationId/:selectedUser',
        key: 'chatConversationHistory',
        component: ChatHome,
        exact: true,
    }
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