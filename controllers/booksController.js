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
    // TODO: Get search parameters from query string
    // const { subject, author, title, page = 1 } = req.query;

    // TODO: Get list of unique subjects for dropdown
    // const [subjects] = await pool.execute('SELECT DISTINCT subject FROM books ORDER BY subject');

    // TODO: Build SQL query with WHERE conditions
    // let sql = 'SELECT * FROM books WHERE 1=1';
    // let params = [];

    // Example for subject filter:
    // if (subject) {
    //   sql += ' AND subject = ?';
    //   params.push(subject);
    // }

    // Example for author search (first name with LIKE):
    // if (author) {
    //   sql += ' AND author LIKE ?';
    //   params.push(author + '%');
    // }

    // Example for title search (contains word, case-insensitive):
    // if (title) {
    //   sql += ' AND LOWER(title) LIKE ?';
    //   params.push('%' + title.toLowerCase() + '%');
    // }

    // TODO: Get total count for pagination
    // const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    // const [countResult] = await pool.execute(countSql, params);
    // const totalBooks = countResult[0].total;
    // const totalPages = Math.ceil(totalBooks / 5);

    // TODO: Add pagination with LIMIT and OFFSET
    // const offset = (page - 1) * 5;
    // sql += ' LIMIT 5 OFFSET ?';
    // params.push(offset);

    // TODO: Execute query and get results
    // const [books] = await pool.execute(sql, params);

    res.render('books/search', {
      title: 'Search Books',
      books: [],
      subjects: [],
      currentPage: 1,
      totalPages: 0
    });
  } catch (error) {
    next(error);
  }
};
