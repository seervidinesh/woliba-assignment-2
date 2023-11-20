import { Router, Request, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { isLeft } from 'fp-ts/lib/Either';

import { FeedHandler } from './handler'
import { wrapError } from '../responses/wrapper'
import { authenticate } from '../authentication/domain';
import { Role } from '../authentication/types';
import { feedSchema, FeedSchema, FetchFeedSchema, fetchFeedSchema, UpdateFeedSchema, updateFeedSchema } from './types';

const router = Router();
const feedHandler = new FeedHandler();
const validator = createValidator();

// signup route.
router.get('/', authenticate([Role.User, Role.Admin]), async (req: Request, res: Response) => {
    const response = await feedHandler.getAllFeeds();
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

// Feed by id.
router.get('/:id',  validator.params(fetchFeedSchema), authenticate([Role.User, Role.Admin]), async (req: ValidatedRequest<FetchFeedSchema>, res: Response) => {
    const response = await feedHandler.getFeedById(req.params.id);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

// Feed Create.
router.post('/', authenticate([Role.Admin]), validator.body(feedSchema), async (req: ValidatedRequest<FeedSchema>, res: Response) => {
    const feedData = req.body;
    const response = await feedHandler.createFeed(feedData);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.sendStatus(200).send(response.right);
});

router.post('/update', authenticate([Role.Admin]), validator.body(updateFeedSchema), async (req: ValidatedRequest<UpdateFeedSchema>, res: Response) => {
    const feedData = req.body;
    const response = await feedHandler.updateFeed(feedData);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.sendStatus(200).send(response.right);
});

// Feed by id.
router.delete('/:id',  validator.params(fetchFeedSchema), authenticate([Role.Admin]), async (req: ValidatedRequest<FetchFeedSchema>, res: Response) => {
    const response = await feedHandler.deleteFeed(req.params.id);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

export { router };