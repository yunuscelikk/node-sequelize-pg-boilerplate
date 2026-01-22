import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/user.routes.js';
import ApiError from './utils/ApiError.js';
import { errorConverter, errorHandler } from './middleware/errorHandler.js';
import logger from './config/logger.js';

config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

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

