import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  const validSchema = Joi.compile(schema);
  const object = Object.keys(req).reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      acc[key] = req[key];
    }
    return acc;
  }, {});

  const { value, error } = validSchema.validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
