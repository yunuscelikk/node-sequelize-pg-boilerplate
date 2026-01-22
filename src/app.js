import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import userRoutes from './routes/user.routes.js';
import ApiError from './utils/ApiError.js';
import { errorConverter, errorHandler } from './middleware/errorHandler.js';
import logger from './config/logger.js';

config();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // In development, allow all origins. In production, you should restrict this.
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    // For production, list your allowed origins
    const allowedOrigins = ['https://your-frontend-domain.com'];
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// Custom logging middleware
app.use((req, res, next) => {
  logger.http(`Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

// 404 Error handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Global error handler
app.use(errorHandler);

export default app;


