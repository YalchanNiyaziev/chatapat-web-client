import {ChatHome} from "../screens/ChatHome";
import Login from "../screens/Login";
import {Register} from "../screens/Register";

const appRoutes = {
    base: {
       path: '/',
       key: 'home',
       component: ChatHome,
    },
    login: {
        path: '/login',
        key: 'login',
        component: Login,
    },
    register: {
        path: '/register',
        key: 'register',
        component: Register
    }
}