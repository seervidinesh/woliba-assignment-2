const baseURL = 'http://localhost:4000' 

export const signup = `${baseURL}/user/signup`;
export const userMe = `${baseURL}/user/me`;
export const logIn = `${baseURL}/auth/login`;
export const logOut = `${baseURL}/auth/logout`;
export const allFeeds = `${baseURL}/feed/`;
export const feedById = feedId => `${baseURL}/feed/${feedId}`;
export const createFeed = `${baseURL}/feed/`;