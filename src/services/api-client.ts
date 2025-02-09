import type { IApiClient } from "@/services/interfaces/api-client.interface";

export class ApiClient implements IApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
        return (await response.json()) as T;
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to post data: ${response.statusText}`);
        return (await response.json()) as T;
    }

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to put data: ${response.statusText}`);
        return (await response.json()) as T;
    }

    async patch<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to put data: ${response.statusText}`);
        return (await response.json()) as T;
    }

    async delete(endpoint: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error(`Failed to delete data: ${response.statusText}`);
    }
}
