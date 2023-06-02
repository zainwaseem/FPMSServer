import express from 'express'
const router = express.Router()
import {
  AddProduct,
  getProduct,
  getALLProducts,
  deleteProduct,
  updateProduct,
} from '../controllers/ProductControllers.js'

import { isAuthenticated, isAuthorized } from '../middleware/auth.js'

router.get(
  '/products',
  isAuthenticated,
  isAuthorized('owner', 'user'),
  getALLProducts,
)
router.get(
  '/products/:id',
  isAuthenticated,
  isAuthorized('owner', 'user'),
  getProduct,
)
router.post('/products', isAuthenticated, isAuthorized('owner'), AddProduct)
router.patch(
  '/products/:id',
  isAuthenticated,
  isAuthorized('owner'),
  updateProduct,
)
router.delete(
  '/products/:id',
  isAuthenticated,
  isAuthorized('owner'),
  deleteProduct,
)

export default router
