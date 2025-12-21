var express = require('express');
var router = express.Router();

// Import controllers
const booksController = require('../controllers/booksController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkout');

// Book search routes
router.get('/search', booksController.searchBooks);

// Cart routes
router.post('/cart/add', cartController.addToCart);
router.get('/cart', cartController.viewCart);
router.post('/cart/update', cartController.updateCart);
router.post('/cart/remove', cartController.removeFromCart);

// Checkout routes
router.post('/checkout', checkoutController.processCheckout);
router.get('/invoice/:orderId', checkoutController.viewInvoice);

module.exports = router;
