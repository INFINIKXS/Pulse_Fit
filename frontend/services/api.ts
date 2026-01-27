import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator
export const BASE_URL = 'http://10.250.111.122:4000/api';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    // headers: { 'Content-Type': 'application/json' }, // REMOVE: Let axios infer this
});

// Logout callback registration
let logoutCallback: (() => void) | null = null;

export const registerLogoutCallback = (callback: () => void) => {
    logoutCallback = callback;
};

// Add a request interceptor to attach the token
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error fetching token', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 401s
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('[API] 401 Unauthorized detected. Triggering logout callback.');
            // Trigger logout if we have a callback
            if (logoutCallback) {
                logoutCallback();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
