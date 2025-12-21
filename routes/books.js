var express = require('express');
var router = express.Router();

const booksController = require('../controllers/booksController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkout');

router.get('/search', booksController.searchBooks);

router.post('/cart/add', cartController.addToCart);
router.get('/cart', cartController.viewCart);
router.post('/cart/update', cartController.updateCart);
router.post('/cart/remove', cartController.removeFromCart);

router.post('/checkout', checkoutController.processCheckout);
router.get('/invoice/:orderId', checkoutController.viewInvoice);

module.exports = router;
