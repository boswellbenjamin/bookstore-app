const pool = require('../db');

/*
 * Checkout (2.4)
 * Features to implement:
 * - Create order in orders table
 * - Insert items into odetails table
 * - Display invoice with delivery date (+7 days)
 * - Clear cart after checkout
 */
exports.processCheckout = async (req, res, next) => {
  let connection;

  try {
    // TODO: Get user_id from session
    // const member_id = req.session.userId;

    // TODO: Start a transaction
    // connection = await pool.getConnection();
    // await connection.beginTransaction();

    // TODO: Get all cart items for user
    // const [cartItems] = await connection.execute(`
    //   SELECT
    //     cart.cart_id,
    //     cart.book_id,
    //     cart.quantity,
    //     books.price
    //   FROM cart
    //   JOIN books ON cart.book_id = books.isbn
    //   WHERE cart.member_id = ?
    // `, [member_id]);

    // TODO: Check if cart is empty
    // if (cartItems.length === 0) {
    //   await connection.rollback();
    //   return res.redirect('/books/cart');
    // }

    // TODO: Calculate order total
    // let totalAmount = 0;
    // cartItems.forEach(item => {
    //   totalAmount += item.price * item.quantity;
    // });

    // TODO: INSERT into orders table
    // const receivedDate = new Date();
    // const deliveredDate = new Date();
    // deliveredDate.setDate(deliveredDate.getDate() + 7); // +7 days
    //
    // const [orderResult] = await connection.execute(
    //   'INSERT INTO orders (member_id, received, delivered, total_amount) VALUES (?, ?, ?, ?)',
    //   [member_id, receivedDate, deliveredDate, totalAmount]
    // );

    // TODO: Get the order_id from INSERT
    // const orderId = orderResult.insertId;

    // TODO: INSERT each cart item into odetails table
    // for (const item of cartItems) {
    //   await connection.execute(
    //     'INSERT INTO odetails (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)',
    //     [orderId, item.book_id, item.quantity, item.price]
    //   );
    // }

    // TODO: DELETE all items from cart for user
    // await connection.execute('DELETE FROM cart WHERE member_id = ?', [member_id]);

    // TODO: Commit transaction
    // await connection.commit();

    // TODO: Redirect to invoice page with order_id
    // res.redirect(`/books/invoice/${orderId}`);

    res.redirect('/books/cart');
  } catch (error) {
    // TODO: Rollback transaction on error
    // if (connection) {
    //   await connection.rollback();
    // }
    next(error);
  } finally {
    // Release connection back to pool
    // if (connection) {
    //   connection.release();
    // }
  }
};

/*
 * View Invoice (2.4)
 * Display order details after checkout
 */
exports.viewInvoice = async (req, res, next) => {
  try {
    // TODO: Get orderId from params
    // const { orderId } = req.params;

    // TODO: Query order details
    // const [orders] = await pool.execute(
    //   'SELECT * FROM orders WHERE order_id = ?',
    //   [orderId]
    // );

    // TODO: Check if order exists
    // if (orders.length === 0) {
    //   return res.status(404).send('Order not found');
    // }
    // const order = orders[0];

    // TODO: Query order items with book details
    // const [orderItems] = await pool.execute(`
    //   SELECT
    //     odetails.quantity,
    //     odetails.price,
    //     books.title,
    //     books.author
    //   FROM odetails
    //   JOIN books ON odetails.book_id = books.isbn
    //   WHERE odetails.order_id = ?
    // `, [orderId]);

    // TODO: Get customer information from members table
    // const [members] = await pool.execute(
    //   'SELECT fname, lname, email, phone, address, city, zip FROM members WHERE member_id = ?',
    //   [order.member_id]
    // );
    // const customer = members[0];

    // TODO: Combine order and customer data
    // const orderWithCustomer = {
    //   ...order,
    //   customer_name: `${customer.fname} ${customer.lname}`,
    //   customer_email: customer.email,
    //   customer_phone: customer.phone,
    //   customer_address: customer.address,
    //   customer_city: customer.city,
    //   customer_zip: customer.zip
    // };

    res.render('books/invoice', {
      title: 'Invoice',
      order: {},
      orderItems: [],
      deliveryDate: null
    });
  } catch (error) {
    next(error);
  }
};
