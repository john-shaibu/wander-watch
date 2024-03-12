class AppError extends Error{
    constructor(message, statusCode = 500){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

class NotFoundError extends AppError{
    constructor(objectId , override = null){
        super(override ? override : `${objectId.toUpperCase()} not found`, 404)
    }
}

class InvalidRequestError extends AppError{
    constructor(override = null){
        super(override ? override : `Invalid Request`, 403)
    }
}

class ServerError extends AppError{
    constructor(override = null){
        super(override ? override : `Something went wrong, Try again later`, 500)
    }
}

module.exports = { AppError, NotFoundError, InvalidRequestError, ServerError }