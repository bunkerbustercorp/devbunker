import axios from 'axios';

export const checkEmail = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkDisplayName = (displayName) => axios.get('/api/auth/exists/display-name/' + displayName);
export const localRegister = ({
    displayName,
    email,
    password
}) => axios.post('/api/auth/register/local', {
    displayName,
    email,
    password
})
export const localLogin = ({email, password}) => axios.post('/api/auth/login/local', {
    email, password
});
export const socialLogin = ({provider, accessToken}) => axios.post('/api/auth/login/' + provider, {
    accessToken
});
export const socialRegister = ({
    displayName,
    provider,
    accessToken
}) => axios.post('/api/auth/register/' + provider, {
    displayName,
    accessToken
});
export const checkLoginStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');