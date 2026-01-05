import pool from '../db.js';
import cartModel from '../models/cartModel.js';

export async function addToCart(req, res, next) {
  try {
    const {  book_id, quantity } = req.body;
    const userId = req.session.user.id;

    await cartModel.addToCart(userId, book_id, quantity);
    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
}

export async function viewCart(req, res, next) {
  try {
    const userId = req.session.user.id;
    const cartItems = await cartModel.getCartItems(userId);

    let grandTotal = 0;
    cartItems.forEach(item => {
      grandTotal += item.price * item.quantity;
    });

    res.render('books/cart', {
      title: 'Your Shopping Cart',
      cartItems: cartItems,
      grandTotal: grandTotal
    });
  } catch (error) {
    next(error);
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const {  isbn } = req.body;
    const userId = req.session.user.id;

    await cartModel.removeFromCart(userId, isbn);
    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
}

export async function updateCart(req, res, next) {
  try {
    const { cart_id, quantity } = req.body;

    await cartModel.updateCartQuantity(cart_id, quantity);
    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
}