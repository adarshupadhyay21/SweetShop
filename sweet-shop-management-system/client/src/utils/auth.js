const TOKEN_KEY = 'sweetshop_token';
const USER_KEY = 'sweetshop_user';

export const setAuth = ({ user, token }) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
};

export const isAuthenticated = () => !!getToken();

export const isAdmin = () => {
    const u = getUser();
    return u && u.role === 'admin';
};
