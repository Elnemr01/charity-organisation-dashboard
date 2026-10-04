// import axios from "axios";

// const client=axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
//     withCredentials: true,
// });

// client.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('zadUser');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );


// export default client;


import axios from "axios";

const config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
};

const client = axios.create(config);

const refreshClient = axios.create(config);

let refreshPromise = null;

const logout = () => {
    localStorage.removeItem("zadUser");
    window.location.href = "/login";
};

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest) {
            if (originalRequest._retry) {
                logout();
                return Promise.reject(error);
            }
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshClient
                        .post("/Auth/refresh") 
                        .finally(() => {
                            refreshPromise = null;
                        });
                }
                await refreshPromise;

                return client(originalRequest);
            } catch (refreshError) {
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default client;