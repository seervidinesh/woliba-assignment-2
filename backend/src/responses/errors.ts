export const errorObject: any = {
    invalidCredentials: {
        code: 'invalid-credentials',
        message: 'Login failed due to invalid credentials.',
    },
    userAlreadyExist: {
        code: 'User Already Exist',
        message: 'User Already Exist'
    },
    invalidRole: {
        code: 'invalidRole',
        message: 'Invalid role. You are not allowed to use this route.'
    },
    unauthorized: {
        code: 'unauthorized',
        message: 'Protected route. Please login and try again.'
    }
}