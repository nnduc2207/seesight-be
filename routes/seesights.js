var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
const SeesightController = require('../controllers/seesight');

router.get('/all', authMiddleware, async function(req, res) {
  try {
    const data = await SeesightController.all();
    return res.send(data);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
