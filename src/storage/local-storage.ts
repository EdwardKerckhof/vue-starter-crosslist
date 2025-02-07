import type { IStorageService } from "./interfaces/storage-service.interface";

export class LocalStorage implements IStorageService {
    get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
