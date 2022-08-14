const mongoose = require('mongoose');
const logger = require('./logger');
const { mongo, env } = require('./vars');

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(mongo, {
      keepAlive: true
    })
    .then(() => logger.info('Successfully connected to MongoDB'));
  return mongoose.connection;
};
