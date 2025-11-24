// Augment Express types to ensure they are used instead of DOM types
/// <reference types="node" />

declare module 'express' {
    export interface Request {
        query: any;
        params: any;
        body: any;
        headers: any;
        method: string;
        originalUrl: string;
        url: string;
        file?: any;
        get(name: string): string | undefined;
    }

    export interface Response {
        status(code: number): Response;
        json(body?: any): Response;
        send(body?: any): Response;
        setHeader(name: string, value: string | string[]): void;
        end(): void;
    }

    export interface NextFunction {
        (err?: any): void;
    }
}

export { };
