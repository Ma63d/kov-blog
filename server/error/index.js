/**
 * @file error type
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/6/1
 */

module.exports = {
    validationError: {
        name: 'ValidationError',
        message: 'Value for one of the parameters in request is invalid.'
    },
    invalidTokenError: {
        name: 'InvalidTokenError',
        message: 'Invalid token.'
    },
    tokenExpiredError: {
        name: 'TokenExpiredError',
        message: 'Your token has benn expired.'
    },
    storageError: {
        name: 'StorageError',
        message: 'Something wrong happens when storing data.'
    },
    idNotExistError: {
        name: 'IdNotExistError',
        message: `The resource id you operating doesn't exist.`
    },
    deleteAlreadyPublishedDraftError: {
        name: 'DeleteAlreadyPublishedDraftError',
        message: `It's forbidden to deleting draft that already published.`
    },
    seedingError: {
        name: 'SeedingError',
        message: 'Something wrong happens when seeding initial data.'
    },
    usernameError: {
        name: 'UsernameError',
        message: 'Username is wrong.'
    },
    passwordError: {
        name: 'PasswordError',
        message: 'Password is wrong.'
    }
}
