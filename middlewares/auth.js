const UserController = require("../controllers/user");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    throw "Failed authentication"
  }

  try {
    const user = await UserController.authenticateToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ error: err });
  }
}

module.exports = authMiddleware;