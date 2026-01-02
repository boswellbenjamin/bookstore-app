import pool from '../db.js';

async function addToCart(userId, isbn, quantity = 1) {
  const [existing] = await pool.execute(
    'SELECT * FROM cart WHERE member_id = ? AND book_id = ?',
    [userId, isbn]
  );

  if (existing.length > 0) {
    await pool.execute(
      'UPDATE cart SET quantity = quantity + ? WHERE cart_id = ?',
      [quantity, existing[0].cart_id]
    );
  } else {
    await pool.execute(
      'INSERT INTO cart (member_id, book_id, quantity) VALUES (?, ?, ?)',
      [userId, isbn, quantity]
    );
  };
};

async function getCartItems(userId) {
    const [cartItems] = await pool.execute(`
      SELECT
        cart.cart_id,
        cart.quantity,
        books.isbn,
        books.title,
        books.author,
        books.price
      FROM cart
      JOIN books ON cart.book_id = books.isbn
      WHERE cart.member_id = ?
    `, [userId]);
    return cartItems;
};

async function updateCartQuantity(cartId, quantity) {
  await pool.execute(
    'UPDATE cart SET quantity = ? WHERE cart_id = ?',
    [quantity, cartId]
  );
}

async function removeFromCart(userId, isbn) {
    await pool.execute(
      'DELETE FROM cart WHERE member_id = ? AND book_id = ?',
      [userId, isbn]
    );
  };

  export default {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeFromCart
  }