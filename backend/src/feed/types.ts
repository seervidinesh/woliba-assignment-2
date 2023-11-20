import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
} from 'express-joi-validation';

export const feedSchema = Joi.object({
    url: Joi.string().required(),
    isVerified: Joi.bool().optional(),
});

export const updateFeedSchema = Joi.object({
    id: Joi.number().required(),
    url: Joi.string().optional().allow(null),
    isVerified: Joi.bool().optional().allow(null),
});

export const fetchFeedSchema = Joi.object({
    id: Joi.string().required()
});

export interface FeedSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        url: string,
        isVerified: boolean
    }
}

export interface UpdateFeedSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: number,
        url: string,
        isVerified: boolean
    }
}

export interface FetchFeedSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string
    }
}

export interface Feed {
    url: string;
    isVerified: boolean;
}

export type FeedCreateError = 
    | 'unableToSaveFeed'
    | 'serverError'

export type FeedFetchError = 
    | 'feedsNotFound'
    | 'serverError'