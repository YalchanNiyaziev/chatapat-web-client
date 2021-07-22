import {ChatHome} from "../components/ChatHome";
import Login from "../components/Login";
import {Register} from "../components/Register";

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