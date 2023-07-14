var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.post('/register', async function(req, res) {
  const { email, password, name } = req.body;
  try {
    const data = await UserController.register({ email, password, name });
    return res.send(data);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/login', async function(req, res) {
  const { email, password } = req.body;
  try {
    const data = await UserController.login({ email, password });
    return res.send(data);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/authenticate', authMiddleware, async function(req, res) {
  res.send({ user: req.user });
});

router.post('/update', authMiddleware, async function(req, res) {
  try {
    const updateData = req.body;
    const user = await UserController.updateById(req.user.id, updateData);
    return res.send(user);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/change-password', authMiddleware, async function(req, res) {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword) throw `oldPassword is empty`;
    if(!newPassword) throw `newPassword is empty`;
    const result = await UserController.changePassword(user.id, oldPassword, newPassword);
    return res.send(result);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
