import axios from "axios";

const client=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('zadToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




export default client;