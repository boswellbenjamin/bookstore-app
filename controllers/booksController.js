import pool from '../db.js';

/*
 * Search Books (2.3)
 * Features to implement:
 * - Subject dropdown/selection
 * - Author search (first name with LIKE)
 * - Title search (contains word, case-insensitive)
 * - Pagination (5 books per page using LIMIT/OFFSET)
 */
export const searchBooks = async (req, res, next) => {
  try {
    const { subject, author, title, page = 1 } = req.query;

    // Get list of unique subjects for dropdown
    const [subjectRows] = await pool.execute('SELECT DISTINCT subject FROM books ORDER BY subject');
    const subjects = subjectRows.map(row => row.subject);

    // Build SQL query with WHERE conditions
    let sql = 'SELECT * FROM books WHERE 1=1';
    let params = [];

    if (subject) {
      sql += ' AND subject = ?';
      params.push(subject);
    }

    if (author) {
      sql += ' AND author LIKE ?';
      params.push(author + '%');
    }

    if (title) {
      sql += ' AND LOWER(title) LIKE ?';
      params.push('%' + title.toLowerCase() + '%');
    }

    // Get total count for pagination
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    const [countResult] = await pool.execute(countSql, params);
    const totalBooks = countResult[0].total;
    const totalPages = Math.ceil(totalBooks / 5);

    // Add pagination with LIMIT and OFFSET
    const offset = (page - 1) * 5;
    sql += ` LIMIT 5 OFFSET ${offset}`;

    // Execute query and get results
    const [books] = await pool.execute(sql, params);

    res.render('books/search', {
      title: 'Search Books',
      books: books,
      subjects: subjects,
      currentPage: parseInt(page),
      totalPages: totalPages,
      subject: subject || '',
      author: author || '',
      title: title || ''
    });
  } catch (error) {
    next(error);
  }
};
