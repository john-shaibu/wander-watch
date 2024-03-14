const { AppError } = require("../utils/AppErrors")

// If route is not found, give a '404 not found' error
const notFound = (req, res, next) => {
    const error = new AppError(`${req.method} ${req.originalUrl} not found. Check request and retry`, 400)
    next(error)
}

// Last error handler. Structures the error to be recieved by the client
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode)
    res.json({
        status: 'error',
        message: err.message,
        stack:  err.stack
    })
}

module.exports = { notFound, errorHandler }