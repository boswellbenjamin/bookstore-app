import pool from '../db.js';

export async function processCheckout(req, res, next) {
  let connection;

  try {
    const userId = req.session.user.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [cartItems] = await connection.execute(`
      SELECT
        cart.userId,
        cart.isbn as book_id,
        cart.qty as quantity,
        books.price
      FROM cart
      JOIN books ON cart.isbn = books.isbn
      WHERE cart.userId = ?
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

    // Get user's shipping address from members table
    const [members] = await connection.execute(
      'SELECT address, city, zip FROM members WHERE userId = ?',
      [userId]
    );
    const member = members[0];

    const [orderResult] = await connection.execute(
      'INSERT INTO orders (userId, received, shipAddress, shipCity, shipZip) VALUES (?, ?, ?, ?, ?)',
      [userId, receivedDate, member.address, member.city, member.zip]
    );

    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await connection.execute(
        'INSERT INTO odetails (ono, isbn, qty, price) VALUES (?, ?, ?, ?)',
        [orderId, item.book_id, item.quantity, item.price]
      );
    }

    await connection.execute(
      'DELETE FROM cart WHERE userId = ?',
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
      SELECT * FROM orders WHERE ono = ?
    `, [orderId]);

    if (orderRows.length === 0) {
      return res.status(404).send('Order not found');
    }

    const order = orderRows[0];

    const [orderItems] = await pool.execute(`
      SELECT
        odetails.qty as quantity,
        odetails.price,
        books.title,
        books.author
      FROM odetails
      JOIN books ON odetails.isbn = books.isbn
      WHERE odetails.ono = ?
    `, [orderId]);

    const [members] = await pool.execute(`
      SELECT fname, lname, email, phone, address, city, zip FROM members WHERE userId = ?`,
      [order.userId]
    );
    const member = members[0];

    // Calculate total amount from order items
    let totalAmount = 0;
    orderItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    // Calculate delivery date (7 days after received date)
    const deliveryDate = new Date(order.received);
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const orderWithCustomer = {
      order_id: order.ono,
      received_date: order.received,
      delivered_date: deliveryDate,
      total_amount: totalAmount,
      customer_name: `${member.fname} ${member.lname}`,
      customer_email: member.email,
      customer_phone: member.phone,
      customer_address: order.shipAddress,
      customer_city: order.shipCity,
      customer_zip: order.shipZip
    };

    res.render('books/invoice', {
      title: 'Order Invoice',
      order: orderWithCustomer,
      orderItems: orderItems,
      deliveryDate: deliveryDate
    });
  } catch (error) {
    next(error);
  }
}