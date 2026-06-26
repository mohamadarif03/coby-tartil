export interface Student {
    id: number;
    name: string;
    email: string;
    module: string;
    progress: number;
    type: string;
    avatar?: string;
}

export interface DashboardCount {
    total_students: number;
}

export interface TopStudent {
    id: number;
    name: string;
    email: string;
    module: string;
    progress: number;
    avatar?: string;
}
