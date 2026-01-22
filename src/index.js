import app from './app.js';
import sequelize from './db/index.js';
import logger from './config/logger.js';
import './models/index.js';

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    await sequelize.sync({ force: false });
    logger.info('All models were synchronized successfully.');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

main();

