export interface IApiClient {
    get<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: unknown): Promise<T>;
    put<T>(endpoint: string, data: unknown): Promise<T>;
    patch<T>(endpoint: string, data: unknown): Promise<T>;
    delete(endpoint: string): Promise<void>;
}
