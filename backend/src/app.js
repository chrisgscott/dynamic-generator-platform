// backend/src/app.js
const express = require('express');
const cors = require('cors');
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const apiLimiter = require('./middlewares/rateLimiter');
const inputSanitizer = require('./middlewares/inputSanitizer');
const errorHandler = require('./middlewares/errorHandler');
const { authenticateJWT } = require('./middlewares/auth');
const securityHeaders = require('./middlewares/securityHeaders');
const db = require('./config/database');

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Other middlewares
app.use(cors());
app.use(securityHeaders);
app.use(express.json());
app.use(inputSanitizer);

// Routes
app.use('/api', apiLimiter, apiRoutes);
app.use('/admin', apiLimiter, authenticateJWT, adminRoutes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use(errorHandler);

// Test database connection
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
    Sentry.captureException(err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = app;