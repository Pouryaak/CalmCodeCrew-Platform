export interface Auth {
    email: string;
    password: string;
    name?: string;
}

export interface User {
    uid: string;
    email: string;
    name: string;
    intrests: string[];
    certificates: string[];
    attendedWorkshops: string[];
    role?: "admin" | "participant"
}

export interface AuthState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    initializing: boolean;
}
