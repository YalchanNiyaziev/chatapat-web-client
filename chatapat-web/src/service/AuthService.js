const tokenKey = 'token';
export default class AuthService {

    storeToken = token => {
        return localStorage.setItem(tokenKey, token);
    };

    getToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(tokenKey);
        }
        return;
    };

    removeToken = () => {
        return localStorage.removeItem(tokenKey);
    }
}
