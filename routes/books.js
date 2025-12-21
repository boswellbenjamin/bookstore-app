import express from 'express';
const router = express.Router();

import * as booksController from '../controllers/booksController.js';
import * as cartController from '../controllers/cartController.js';
import * as checkoutController from '../controllers/checkout.js';

router.get('/search', booksController.searchBooks);

router.post('/cart/add', cartController.addToCart);
router.get('/cart', cartController.viewCart);
router.post('/cart/update', cartController.updateCart);
router.post('/cart/remove', cartController.removeFromCart);

router.post('/checkout', checkoutController.processCheckout);
router.get('/invoice/:orderId', checkoutController.viewInvoice);

export default router;
