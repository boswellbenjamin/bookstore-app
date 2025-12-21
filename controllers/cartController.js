const pool = require('../db');

/*
 * Add to Cart (2.3)
 * Features to implement:
 * - Add book to cart table
 * - Update quantity if book already exists in cart
 * - Associate with user session
 */
exports.addToCart = async (req, res, next) => {
  try {
    // TODO: Get book_id and quantity from request body
    // const { book_id, quantity = 1 } = req.body;

    // TODO: Get user_id from session (once auth is implemented)
    // const member_id = req.session.userId;

    // TODO: Check if book already in cart
    // const [existing] = await pool.execute(
    //   'SELECT * FROM cart WHERE member_id = ? AND book_id = ?',
    //   [member_id, book_id]
    // );

    // TODO: If yes, UPDATE quantity; if no, INSERT new row
    // if (existing.length > 0) {
    //   await pool.execute(
    //     'UPDATE cart SET quantity = quantity + ? WHERE cart_id = ?',
    //     [quantity, existing[0].cart_id]
    //   );
    // } else {
    //   await pool.execute(
    //     'INSERT INTO cart (member_id, book_id, quantity) VALUES (?, ?, ?)',
    //     [member_id, book_id, quantity]
    //   );
    // }

    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
};

/*
 * View Cart (2.4)
 * Features to implement:
 * - Display cart items with book details (JOIN cart and books tables)
 * - Calculate total per item (price * quantity)
 * - Calculate grand total
 */
exports.viewCart = async (req, res, next) => {
  try {
    // TODO: Get user_id from session
    // const member_id = req.session.userId;

    // TODO: Query cart items with book details
    // const [cartItems] = await pool.execute(`
    //   SELECT
    //     cart.cart_id,
    //     cart.quantity,
    //     books.isbn,
    //     books.title,
    //     books.author,
    //     books.price
    //   FROM cart
    //   JOIN books ON cart.book_id = books.isbn
    //   WHERE cart.member_id = ?
    // `, [member_id]);

    // TODO: Calculate grand total
    // let grandTotal = 0;
    // cartItems.forEach(item => {
    //   grandTotal += item.price * item.quantity;
    // });

    res.render('books/cart', {
      title: 'Shopping Cart',
      cartItems: [],
      grandTotal: 0
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Update Cart Quantity
 * Optional: Allow users to update quantities from cart page
 */
exports.updateCart = async (req, res, next) => {
  try {
    // TODO: Get cart_id and new quantity from request body
    // const { cart_id, quantity } = req.body;

    // TODO: UPDATE cart SET quantity = ? WHERE cart_id = ?
    // await pool.execute(
    //   'UPDATE cart SET quantity = ? WHERE cart_id = ?',
    //   [quantity, cart_id]
    // );

    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
};

/*
 * Remove from Cart
 * Optional: Allow users to remove items from cart
 */
exports.removeFromCart = async (req, res, next) => {
  try {
    // TODO: Get cart_id from request body
    // const { cart_id } = req.body;

    // TODO: DELETE FROM cart WHERE cart_id = ?
    // await pool.execute('DELETE FROM cart WHERE cart_id = ?', [cart_id]);

    res.redirect('/books/cart');
  } catch (error) {
    next(error);
  }
};
