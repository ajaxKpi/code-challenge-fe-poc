import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthApi } from '../auth/api/AuthApi';
import { ServerError } from './DTOs';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        responseType: "json",
        "Access-Control-Allow-Origin": '*',
    },
});

export function sendGetRequest<T>(method: string, queryParams: { [key: string]: any } = {}): Promise<T> {
    const path = buildQuery(method, queryParams)
    return api.get<T>(path).then(getAxiosData);
}

export function sendPostRequest<T, U>(method: string, body: T, queryParams: { [key: string]: any } = {}): Promise<U> {
    const path = buildQuery(method, queryParams)
    return api.post(path, body, queryParams).then(getAxiosData);
}

function buildQuery(method: string, queryParams: { [key: string]: any }) {
    const query: string = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&') ?? '';
    return query ? `${method}?${query}` : method;
}

function getAxiosData<T>(response: AxiosResponse<T>): T {
    return response.data
}

api.interceptors.response.use(undefined, (err: ServerError) => {
    if (err.error === 'Unauthorized') {
        AuthApi.clearLoginToken();
    }
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = AuthApi.getLoginToken();
    if (config?.headers) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
})
