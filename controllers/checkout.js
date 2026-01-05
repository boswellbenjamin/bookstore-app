import pool from '../db.js';

export async function processCheckout(req, res, next) {
  let connection;

  try {
    const userId = req.session.user.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [cartItems] = await connection.execute(`
      SELECT
        cart.cart_id,
        cart.book_id,
        cart.quantity,
        books.price
      FROM cart
      JOIN books ON cart.book_id = books.isbn
      WHERE cart.member_id = ?
    `, [userId]);

    if (cartItems.length === 0) {
      await connection.rollback();
      return res.redirect('/books/cart');
    }

    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    const receivedDate = new Date();
    const deliveredDate = new Date();
    deliveredDate.setDate(receivedDate.getDate() + 7);

    const [orderResult] = await connection.execute(
      'INSERT INTO orders (member_id, order_date, received_date, delivered_date, total_amount) VALUES (?, NOW(), ?, ?, ?)',
      [userId, receivedDate, deliveredDate, totalAmount]
    );

    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await connection.execute(
        'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.book_id, item.quantity, item.price]
      );
    }

    await connection.execute(
      'DELETE FROM cart WHERE member_id = ?',
      [userId]
    );

    await connection.commit();
    res.redirect(`/books/invoice/${orderId}`);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function viewInvoice(req, res, next) {
  try {
    const { orderId } = req.params;

    const [orderRows] = await pool.execute(`
      SELECT * FROM orders WHERE order_id = ?
    `, [orderId]);

    if (orderRows.length === 0) {
      return res.status(404).send('Order not found');
    }

    const order = orderRows[0];

    const [orderItems] = await pool.execute(`
      SELECT
        order_items.quantity,
        order_items.price,
        books.title,
        books.author
      FROM order_items
      JOIN books ON order_items.book_id = books.isbn
      WHERE order_items.order_id = ?
    `, [orderId]);

    const [members] = await pool.execute(`
      SELECT fname, lname, email, phone, address, city, zip FROM members WHERE member_id = ?`,
      [order.member_id]
    );
    const member = members[0];

    const orderWithCustomer = {
      ...order,
      customer_name: `${member.fname} ${member.lname}`,
      customer_email: member.email,
      customer_phone: member.phone,
      customer_address: member.address,
      customer_city: member.city,
      customer_zip: member.zip
    };

    res.render('books/invoice', {
      title: 'Order Invoice',
      order: orderWithCustomer,
      orderItems: orderItems,
      deliveryDate: order.delivered_date
    });
  } catch (error) {
    next(error);
  }
}