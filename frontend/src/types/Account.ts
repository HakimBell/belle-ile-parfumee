export interface Account {
    email: string;
    role: 'CLIENT' | 'ADMIN';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    role: 'CLIENT' | 'ADMIN';
    // token n'est plus dans la réponse - il est dans un cookie httpOnly
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}