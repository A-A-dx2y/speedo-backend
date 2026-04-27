import type { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    updateById(id: string, update: UpdateQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    find(query?: FilterQuery<T>): Promise<T[]>;
    deleteById(id: string): Promise<T | null>;
    findOne(query: FilterQuery<T>): Promise<T | null>;
}