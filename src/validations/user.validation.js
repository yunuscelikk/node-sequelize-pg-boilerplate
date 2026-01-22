import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

export default {
  createUser,
  updateUser,
  deleteUser,
};
