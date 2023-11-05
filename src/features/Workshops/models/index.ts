export enum WorkshopModalType {
    ADD = "ADD",
    UPDATE = "UPDATE"
}

export interface Workshop {
    uid: string;
    name: string;
    image: string;
    description: string;
    materials: Material[];
    requirements: string;
    date: string;
    time: string;
    mentor: string;
    duration: string;
    status: WorkshopStatus;
    location: string;
    students: string[]
}

export interface Material {
    name: string;
    link?: string;
    description?: string;
}

export enum WorkshopStatus {
    UPCOMING = "upcoming",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}