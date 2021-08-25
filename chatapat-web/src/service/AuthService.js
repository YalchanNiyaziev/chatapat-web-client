const tokenKey = 'token';
const usernameKey = 'username';
const userProfileImageKey = 'profileImage';

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

    storeUsername = username => {
        return localStorage.setItem(usernameKey, username);
    };

    getUsername = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(usernameKey);
        }
        return;
    };

    removeUsername = () => {
        return localStorage.removeItem(usernameKey);
    }

    storeProfileImage = profileImage => {
        return localStorage.setItem(userProfileImageKey, profileImage);
    };

    getProfileImage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(userProfileImageKey);
        }
        return;
    };

    removeProfileImage = () => {
        return localStorage.removeItem(userProfileImageKey);
    }
}
