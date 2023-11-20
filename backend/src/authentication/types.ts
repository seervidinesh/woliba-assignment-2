import * as Joi from 'joi';

export enum Role {
    Admin = 'ADMIN',
    User = 'USER'
}

export const loginSchema = Joi.object({
    email: Joi.string()
        .required(),
    password: Joi.string().required().min(6).max(18)
});

export interface LoginDetails {
    email: string;
    password: string;
}

export interface LoginResponse {
    authToken: string;
}