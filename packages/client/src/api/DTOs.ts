import { AxiosResponse } from 'axios';

export interface ServerError extends AxiosResponse{
    error: string;
}
