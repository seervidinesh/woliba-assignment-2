import { Router, Request, Response } from 'express';
const router = Router();

import { AuthenticationHandler } from './handler';
import { isLeft } from 'fp-ts/lib/Either';
import { wrapError } from '../responses/wrapper'
import { getSessionId } from './domain';

const authenticationHandler = new AuthenticationHandler();

// Home page route.
router.post("/login", async (req: Request, res: Response) => {
    const response = await authenticationHandler.login(req.body);
    if (isLeft(response)) {
        return res.status(401).send({ error: wrapError(response.left) });
    }
    return res.status(200).send(response.right);
});

// About page route.
router.post("/logout", getSessionId, function (req: any, res: Response) {
    authenticationHandler.logout(req.sessionId);
    return res.status(200).send({
        status: 'success',
        message: 'User logged out'
    });
});

export { router };