import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET coming soon page. */
router.get('/temp/coming', (req, res, next) => {
  res.render('temp/coming');
});

export default router;
