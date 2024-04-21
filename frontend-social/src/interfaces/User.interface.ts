interface photo{
    id:string
}

export interface User {
    id: string;
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    created_at: string;
    updated_at: string;
    token?:string
    photos:photo[]
}