const router = require('express').Router();

router.use('/products', require('./product.routes'));
router.use('/categories', require('./category.routes'));
router.use('/regions', require('./region.routes'));
router.use('/comments', require('./comment.routes'));
router.use('/orders', require('./order.routes'));

module.exports = router;