class AppError extends Error{
    constructor(message, statusCode = 500){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

class NotFoundError extends AppError{
    constructor(objectId , override = null){
        super()
        this.message = override ? override : `${objectId.toUpperCase()} not found`
        this.statusCode = 404
    }
}

class InvalidRequestError extends AppError{
    constructor(override = null){
        super()
        this.message = override ? override : `Invalid Request`
        this.statusCode = 400
    }
}

class ForbiddenRequestError extends AppError{
    constructor(override = null){
        super()
        this.message = override ? override : `You do not have the rights to carry out this action`
        this.statusCode = 403
    }
}

class ServerError extends AppError{
    constructor(override = null){
        super()
        this.message = override ? override : `Something went wrong, Try again later`
        this.statusCode = 500
    }
}

module.exports = { AppError, NotFoundError, InvalidRequestError, ServerError, ForbiddenRequestError }