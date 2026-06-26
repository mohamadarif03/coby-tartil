export type ApiResponseType<T extends 'single' | 'multiple' = 'single', D = any> = {
    success: boolean | number;
    message?: string;
    data?: T extends 'single' ? D : D[]
}

/** Convenience: a single-item API response */
export type SingleResponse<T> = ApiResponseType<'single', T>;

/** Convenience: a list API response */
export type ListResponse<T> = ApiResponseType<'multiple', T>;

export type ApiResponsePaginationType<T> = {
    success: boolean | number;
    message?: string;
    data: T[];
    pagination: PaginationType;
}

export type PaginationType = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type DefaultDataType = {
    id: string;
    created_at: string;
    updated_at: string;
}