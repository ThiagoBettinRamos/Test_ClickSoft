interface CacheContent {
    [key: string]: any;
}

const cache: CacheContent = {};

export const setCache = (key: string, data: any) => {
    cache[key] = data;
};

export const getCache = (key: string) => {
    return cache[key];
};
