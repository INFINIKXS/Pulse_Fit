import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    userInfo: any | null;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any | null>(null);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            // Backend returns { success, data: { token, user } }
            const { token, user } = response.data.data;

            setUserToken(token);
            setUserInfo(user);
            await SecureStore.setItemAsync('userToken', token);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', data);
            // Backend returns { success, data: { token, user } }
            const { token, user } = response.data.data;

            if (token) {
                setUserToken(token);
                await SecureStore.setItemAsync('userToken', token);
            }
            if (user) {
                setUserInfo(user);
                await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
            }
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await SecureStore.deleteItemAsync('userToken');
            await SecureStore.deleteItemAsync('userInfo');
            setUserToken(null);
            setUserInfo(null);
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let token = await SecureStore.getItemAsync('userToken');
            let user = await SecureStore.getItemAsync('userInfo');

            if (token) {
                setUserToken(token);
                if (user) setUserInfo(JSON.parse(user));
            }
        } catch (error) {
            console.error('Is logged in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signUp, signOut, userToken, isLoading, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
