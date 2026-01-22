import db from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const { User } = db;

export const createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const newUser = await User.create({ name, email });
  res.status(201).json(newUser);
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const [updated] = await User.update({ name, email }, { where: { id } });
  if (!updated) {
    throw new ApiError(404, 'User not found');
  }
  const updatedUser = await User.findByPk(id);
  res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await User.destroy({ where: { id } });
  if (!deleted) {
    throw new ApiError(404, 'User not found');
  }
  res.status(204).send();
});

