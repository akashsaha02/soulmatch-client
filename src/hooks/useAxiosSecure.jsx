import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Attach the access token to every secure request. Registered once at module load
// so it never stacks up across renders.
axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let signingOut = false;

const useAxiosSecure = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Log out on expired/forbidden tokens. Ejected on unmount so handlers don't accumulate.
        const id = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if ((status === 401 || status === 403) && !signingOut) {
                    signingOut = true;
                    try {
                        await logoutUser();
                        navigate('/login');
                    } finally {
                        signingOut = false;
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => axiosSecure.interceptors.response.eject(id);
    }, [logoutUser, navigate]);

    return axiosSecure;
}

export default useAxiosSecure
