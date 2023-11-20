import Bcrypt from 'bcrypt';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import jwt from 'jsonwebtoken';
import _ from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import * as UserRepo from '../../src/user/repo';
import * as repo from './repo';
import { LoginDetails, LoginResponse } from './types';
import { AuthError } from '../../src/responses/types';
import { User } from '../user/types';
import config from '../config';

const getUserToken = async (jwtSecret: string, user: User) => {
    const sessionId = uuidv4();
    await repo.saveSession(sessionId, user.id);
    const jwtToken = jwt.sign(
        { userId: user.id.toString(), scope: user.roles, sessionId: sessionId },
        jwtSecret,
    );
    return jwtToken;
};

export interface AuthenticationInterface {
    login(loginDetails: LoginDetails): Promise<Either<AuthError, LoginResponse>>;
    getUserToken(user: User): Promise<string>;
    validateJWTToken(credentials: any, request: Request, h: any): Promise<{ isValid: boolean }>;
    logout(sessionId: string): void;
}

export class AuthenticationHandler implements AuthenticationInterface {
    async login(loginDetails: LoginDetails): Promise<Either<AuthError, LoginResponse>> {
        try {
            let user = await UserRepo.getUser({ email: loginDetails.email });
            if(isLeft(user)) return left('invalidCredentials');
            const match = await Bcrypt.compare(
                loginDetails.password,
                user.right.password || '',
            );
            
            if (!match) return left('invalidCredentials');
            const jwtToken: string = await getUserToken(config.JWT_SECRET, user.right);
            return right({ authToken: jwtToken });
        } catch (error) {
            console.error(error);
            return left('serverError');
        }
    }
    getUserToken(user: User) {
        return getUserToken(config.JWT_SECRET, user)
    }
    async validateJWTToken (credentials: any, req: Request, res: Response) {
        const currentSession = await repo.getSessionBySessionId(credentials.sessionId);
        if (_.isNil(currentSession)) { return { isValid: false } }
        return { isValid: true };
    }
    async logout(sessionId: string) {
        const res = await repo.deleteSession(sessionId);
        return res;
    }
}