import pool from '../db.js';

async function addToCart(userId, isbn, quantity = 1) {
  const [existing] = await pool.execute(
    'SELECT * FROM cart WHERE userId = ? AND isbn = ?',
    [userId, isbn]
  );

  if (existing.length > 0) {
    await pool.execute(
      'UPDATE cart SET qty = qty + ? WHERE userId = ? AND isbn = ?',
      [quantity, userId, isbn]
    );
  } else {
    await pool.execute(
      'INSERT INTO cart (userId, isbn, qty) VALUES (?, ?, ?)',
      [userId, isbn, quantity]
    );
  };
};

async function getCartItems(userId) {
    const [cartItems] = await pool.execute(`
      SELECT
        cart.userId,
        cart.isbn,
        cart.qty as quantity,
        books.title,
        books.author,
        books.price
      FROM cart
      JOIN books ON cart.isbn = books.isbn
      WHERE cart.userId = ?
    `, [userId]);
    return cartItems;
};

async function updateCartQuantity(userId, isbn, quantity) {
  await pool.execute(
    'UPDATE cart SET qty = ? WHERE userId = ? AND isbn = ?',
    [quantity, userId, isbn]
  );
}

async function removeFromCart(userId, isbn) {
    await pool.execute(
      'DELETE FROM cart WHERE userId = ? AND isbn = ?',
      [userId, isbn]
    );
  };

  export default {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeFromCart
  }