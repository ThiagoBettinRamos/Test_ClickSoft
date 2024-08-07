import axios from 'axios';
import { GithubUser } from './types';
import { logError, logInfo } from './logger';
import { getCache, setCache } from './cache';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const fetchUser = async (username: string): Promise<GithubUser> => {
    const cacheKey = `user-${username}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        logInfo(`Cache hit for ${username}`);
        return cachedData;
    }

    try {
        const response = await api.get<GithubUser>(`/users/${username}`);
        setCache(cacheKey, response.data);
        logInfo(`API call successful for ${username}`);
        return response.data;
    } catch (error) {
        logError("Error fetching user from GitHub API", error);
        throw error;
    }
};
