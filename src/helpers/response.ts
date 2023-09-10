import { Response } from "express"

interface ApiResponse<T> {
    status: number,
    message: string,
    data? : T,
}

interface ErrResponse {
    status: number, 
    message: string,
    error: string
}

export const createResponseErr = (res: Response, status: number, message: string, err: Error): Response => {
    console.log(err);
    const error = err.message
    const errResponse: ErrResponse = {
        status, 
        message, 
        error
    };

    return res.status(status).json(errResponse);   
}

export const createResponse = <T>(res: Response, status: number, message: string, data?: T): Response => {
    const response: ApiResponse<T> = {
        status,
        message,
    };

    if (data !== undefined) response.data = data;

    return res.status(status).json(response);
};