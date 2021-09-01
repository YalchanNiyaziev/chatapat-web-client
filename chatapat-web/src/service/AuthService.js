const tokenKey = 'token';
const usernameKey = 'username';
const userProfileImageKey = 'profileImage';
const selectedConversationIdKey = 'selectedConversationId';

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
    };

    storeSelectedConversationId = conversationId => {
        if (conversationId) {
            return localStorage.setItem(selectedConversationIdKey, conversationId);
        }
    };

    getSelectedConversationId = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(selectedConversationIdKey);
        }
        return;
    }

    removeSelectedConversationId = () => {
        return localStorage.removeItem(selectedConversationIdKey);
    }
}
