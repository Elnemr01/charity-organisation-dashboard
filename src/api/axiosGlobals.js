import axios from "axios";

const client=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('zadUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default client;