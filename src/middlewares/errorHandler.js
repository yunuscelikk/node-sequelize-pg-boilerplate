import httpStatus from 'http-status';
import { ValidationError } from 'express-json-validator-middleware';

import * as errors from '../utils/api-errorjs';

const { APIError } = errors.default;

export default async (err, req, res, next) => {
  let { status } = err;
  const { message } = err;

  let error = {};
  let msg;

  if (err instanceof APIError) {
    msg = message;
  } else if (err instanceof ValidationError) {
    status = httpStatus.BAD_REQUEST;
    msg = httpStatus[httpStatus.BAD_REQUEST];
    error = err.validationErrors;
  } else {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    msg = 'Something went wrong!';
    error = err;
  }

  return res.status(status).send({
    success: false,
    msg,
    error,
  });
};