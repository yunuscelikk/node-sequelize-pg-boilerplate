import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import validate from '../middleware/validate.js';
import userValidation from '../validations/user.validation.js';

const router = Router();

router.post('/', validate(userValidation.createUser), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validate(userValidation.updateUser), updateUser);
router.delete('/:id', validate(userValidation.deleteUser), deleteUser);

export default router;

