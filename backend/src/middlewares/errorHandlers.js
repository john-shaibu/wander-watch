// If route is not found, give a '404 not found' error
const notFound = (req, res, next) => {
    const error = new Error(`${req.method} ${req.originalUrl} not found. Check request and retry`, 400)
    res.status(404)
    next(error)
}

// Last error handler. Structures the error to be recieved by the client
const errorHandler = (err, req, res, next) => {
    const statusCode = !err.statusCode ? 500 : err.statusCode
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
        stack:  err.stack
    })
}

module.exports = { notFound, errorHandler }