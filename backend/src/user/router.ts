import { Router, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { isLeft } from 'fp-ts/lib/Either';

import { UserHandler } from './handler'
import { wrapError } from '../responses/wrapper'
import { SignUpRequestSchema, signUpSchema } from './types';
import { authenticate } from '../authentication/domain';
import { Role } from '../authentication/types';

const router = Router();
const userHandler = new UserHandler();
const validator = createValidator();

// signup route.
router.post('/signup', validator.body(signUpSchema), async (req: ValidatedRequest<SignUpRequestSchema>, res: Response) => {
    const signUpDetails = req.body;
    const response = await userHandler.signUpUser(signUpDetails);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

// User me route.
router.get('/me', authenticate([Role.Admin, Role.User]), async (req: any, res: Response) => {
    const response = await userHandler.userDetails(req.userData.userId);
    return res.status(200).send(response);
});

export { router };