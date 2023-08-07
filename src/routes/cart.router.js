const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Hi from cart router');
});

module.exports = router;