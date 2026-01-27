import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { File, Directory } from 'expo-file-system';
import { fetch } from 'expo/fetch';
import api, { registerLogoutCallback, BASE_URL } from '../services/api';

interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    userInfo: any | null;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (data: any) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserAvatar: (uri: string) => Promise<void>;
    setUserInfo: (user: any) => void;
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

    const updateUserAvatar = async (uri: string) => {
        // isLoading triggers global loading state which might unmount UI.
        // We perform this in background or handle local loading state if needed.
        // setIsLoading(true); 
        try {
            // Create File instance from URI
            const filename = uri.split('/').pop() || 'avatar.jpg';
            const dirUri = uri.substring(0, uri.lastIndexOf('/'));
            const dir = new Directory(dirUri);
            const file = new File(dir, filename);

            const formData = new FormData();

            // @ts-ignore: expo/fetch supports passing File instance directly
            formData.append('avatar', file);

            const token = userToken || await SecureStore.getItemAsync('userToken');

            const response = await fetch(`${BASE_URL}/users/me`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    signOut();
                }
                const errorText = await response.text();
                console.error('Upload failed response:', errorText);
                throw new Error(`Upload failed: ${response.status}`);
            }

            const resData = await response.json();
            // Backend returns { success, data: updatedUser, message }
            const updatedUser = resData.data;

            if (updatedUser) {
                setUserInfo(updatedUser);
                await SecureStore.setItemAsync('userInfo', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error('Update avatar error:', error);
            throw error;
        } finally {
            // setIsLoading(false);
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

        // Register the logout callback with the API service
        // This handles 401 Unauthorized errors by logging the user out
        registerLogoutCallback(() => {
            signOut();
        });
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            signOut,
            userToken,
            isLoading,
            userInfo,
            updateUserAvatar,
            setUserInfo // Exposed to allow updates from Onboarding
        }}>
            {children}
        </AuthContext.Provider>
    );
};
