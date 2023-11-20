import { NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from '../config';
import { wrapError } from '../responses/wrapper';
import { getSessionBySessionId } from './repo';

export const authenticate = (roles: string[]) => {
    return async (req: any, res: any, next: NextFunction) => {
        try {
            const { token } = req.headers;
            const decode: any = jwt.verify(token, config.JWT_SECRET);
            if(!JSON.parse(decode.scope).some((r : string) => roles.includes(r))) return res.status(401).send({ error: wrapError('invalidRole') });
            const session = await getSessionBySessionId(decode.sessionId);
            if(!session) return res.status(401).send({ error: wrapError('unauthorized') });
            req.userData = decode;
            next();
        } catch (err) {
            return res.status(401).send({ error: wrapError('unauthorized') })
        }
    }
}

export const getSessionId = (req: any, res: any, next: NextFunction) => {
    try {
        const { token } = req.headers;
        const decode: any = jwt.verify(token, config.JWT_SECRET);
        req.sessionId = decode.sessionId;
        next();
    } catch (err) {
        req.sessionId = null;
        next();
    }
}