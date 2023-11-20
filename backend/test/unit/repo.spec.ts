import { expect } from 'chai';
import { saveFeed, fetchAllFeeds, fetchFeedById, deleteFeed, updateFeed } from '../../src/feed/repo';
import { resetDB } from '../env/resetdb';

describe("Fetch all feeds", async () => {
    beforeEach(async () => {
        await resetDB();
        await saveFeed({
            url: 'test-feed 1',
            isVerified: true
        })
        await saveFeed({
            url: 'test-feed 2',
            isVerified: false
        })
    })
    it("Should fetch all feed",async () => {
        const feeds = await fetchAllFeeds();
        expect(feeds.length).to.equal(2);
        expect(feeds[0].url).to.equal('test-feed 1');
        expect(feeds[1].url).to.equal('test-feed 2');
        expect(feeds[0].isVerified).to.equal(1);
        expect(feeds[1].isVerified).to.equal(0);
    })
});

describe("Fetch feed by id", async () => {
    beforeEach(async () => {
        await resetDB();
        await saveFeed({
            url: 'test-feed 1',
            isVerified: true
        })
    })
    it("Should fetch feed by id",async () => {
        const feed = await fetchFeedById('1');
        expect(feed[0].url).to.equal('test-feed 1');
        expect(feed[0].isVerified).to.equal(1);
        expect(feed[0].id).to.equal(1);
    })
});

describe("delete feed by id", async () => {
    beforeEach(async () => {
        await resetDB();
        await saveFeed({
            url: 'test-feed 1',
            isVerified: true
        })
    })
    it("Should delete feed by id",async () => {
        await deleteFeed('1');
        const feed = await fetchFeedById('1');
        expect(feed.length).to.equal(0);
    })
});

describe("update feed by id", async () => {
    beforeEach(async () => {
        await resetDB();
        await saveFeed({
            url: 'test-feed 1',
            isVerified: true
        })
    })
    it("Should update feed by id",async () => {
        await updateFeed('1', {
            url: 'test-feed 2',
            isVerified: false
        })
        const feed = await fetchFeedById('1');
        expect(feed[0].url).to.equal('test-feed 2');
        expect(feed[0].isVerified).to.equal(0);
        expect(feed[0].id).to.equal(1);
    })
});



describe("Fetch all feeds", async () => {
    beforeEach(async () => {
        await resetDB();
        await saveFeed({
            url: 'test-feed 1',
            isVerified: true
        })
        await saveFeed({
            url: 'test-feed 2',
            isVerified: false
        })
    })
    it("Should fetch all feed",async () => {
        const feeds = await fetchAllFeeds();
        expect(feeds.length).to.equal(2);
        expect(feeds[0].url).to.equal('test-feed 1');
        expect(feeds[1].url).to.equal('test-feed 2');
        expect(feeds[0].isVerified).to.equal(1);
        expect(feeds[1].isVerified).to.equal(0);
    })
});