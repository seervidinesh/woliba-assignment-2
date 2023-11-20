import { Either, right, left, isLeft } from 'fp-ts/lib/Either';
import * as repo from './repo';
import { Feed, FeedCreateError, FeedFetchError } from './types';


export interface FeedInterface {
    getAllFeeds(): Promise<Either<FeedFetchError, Feed[]>>;
    getFeedById(feedId: string): Promise<Either<FeedFetchError, Feed>>;
    deleteFeed(feedId: string): Promise<Either<FeedFetchError, Feed>>;
    createFeed(feed: Feed): Promise<Either<FeedCreateError, Feed>>;
    updateFeed(feed: Feed): Promise<Either<FeedCreateError, Feed>>;
}

export class FeedHandler implements FeedInterface {
    async getAllFeeds(): Promise<Either<FeedFetchError, Feed[]>> {
        try {
            const feeds = await repo.fetchAllFeeds();
            if(!feeds.length) return left('feedsNotFound');
            return right(feeds);
        } catch (error: any) {
            return left('serverError');
        }
    }
    async getFeedById(feedId: string): Promise<Either<FeedFetchError, Feed>> {
        try {
            const feed = await repo.fetchFeedById(feedId);
            if(!feed.length) return left('feedsNotFound');
            return right(feed[0]);
        } catch (error) {
            return left('feedsNotFound');
        }
    }

    async deleteFeed(feedId: string): Promise<Either<FeedFetchError, Feed>> {
        try {
            const feed = await repo.deleteFeed(feedId);
            if(!feed) return left('feedsNotFound');
            return right(feed[0]);
        } catch (error) {
            return left('feedsNotFound');
        }
    }

    async createFeed(feed: Feed): Promise<Either<FeedCreateError, any>> {
        try {
            const newFeed = await repo.saveFeed(feed);
            if(!newFeed.length) return left('unableToSaveFeed')
            return right(newFeed[0]);
        } catch (error) {
            return left('serverError');
        }
    }
    async updateFeed(feedData): Promise<Either<FeedCreateError, any>> {
        try {
            const updatedFeed = await repo.updateFeed(feedData.id, {
                url: feedData.url,
                isVerified: feedData.isVerified
            });
            if(!updatedFeed) return left('unableToSaveFeed')
            return right(updatedFeed[0]);
        } catch (error) {
            return left('serverError');
        }
    }
}