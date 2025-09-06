import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
  getContactStats,
} from '../controllers/contactController';

const router = express.Router();

// Public routes
router.post('/', createContact);

// Admin routes (TODO: Add authentication middleware)
router.get('/', getContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router;
