const { User } = require('../entities');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async ({ email, password }) => {
  const userList = await User.find({ email })
    if (!userList.length) {
        throw "Account hasn't been created"
    }
    const user = userList[0];

    const checkPass = bcrypt.compareSync(password, user.password)
    if (!checkPass) {
        throw "Password wrong"
    }

    const token = jwt.sign(
        { ...user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    )

    return { user, token }
}

const register = async ({ email, password, name }) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const user = await User.create({
    email,
    name,
    password: hash,
  })

  return { user }
}

const authenticateToken = async (token) => {
  try {
    let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    user = await User.getById(user.id)
    if (!user) {
        throw "Failed Authentication"
    }
    return user
  } catch (error) {
    throw error
  }
}

const updateById = async (id, data) => {
  return await User.updateById(id, data);
}

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await User.getById(id);
  const checkPass = bcrypt.compareSync(oldPassword, user.password)
  if (!checkPass) {
    throw "Old password wrong";
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(newPassword, salt);
  return await updateById(id, { password: hash });
}

const UserController = {
  login,
  register,
  authenticateToken,
  updateById,
  changePassword,
}

module.exports = UserController;