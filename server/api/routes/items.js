const { Router } = require('express');
const router = Router();

const itemsController = require('../controllers/items');

router.get('/', itemsController.get);
router.post('/', itemsController.set);

module.exports = router;
