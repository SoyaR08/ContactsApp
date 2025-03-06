export interface LoginSuccess {
    message: string;
    userId: string;
}

export interface CheckEmailResponse {
    exists: boolean;
}

export interface User{
    nombre: string;
    email: string;
    password: string
}

export interface RegisterResponse{
    message: string;
}
