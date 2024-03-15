const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('../middlewares/errorHandlers');
const authRouter = require('../routes/authRoutes');
const locationRouter = require('../routes/locationRoutes');
const userRouter = require('../routes/userRoutes');
const compression = express('compression');
const cookieParser = require('cookie-parser')

const app = express();


// Sites that can access our API
const allowedOrigins = ['http://localhost:5173', 'https://wander-watch.vercel.app']; // To be changed

// Core Middlewares
app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: (originUrl, callback) => {
      // If the request has no origin, e.g in api testers like postman, allow the request.
      if (!originUrl) return callback(null, true);

      // If request origin is not allowed, throw a cors error
      if (!allowedOrigins.includes(originUrl)) {
        const corsError = new Error('Wetin you dey find?');
        return callback(corsError, false);
      }

      return callback(null, true);
    },
  })
);

// Request Compression
app.use(compression);

app.use(express.json());

// Logger - using the morgan logging library
// This middleware is used for logging requests and responses.
// It provides a structured way to see information like the HTTP method,
// path, status code, and other details.
app.use(morgan('short'));

app.use(cookieParser())

// Routes
app.use('/auth', authRouter);
app.use('/locations', locationRouter);
app.use('/users', userRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
