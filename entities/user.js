const { create, find, getById, updateById } = require('./base');
const User = {
  find: (data) => {
    return find('User', data);
  },
  create: async (data) => {
    if (!data.email) throw `email is required`;
    if (!data.password) throw `password is required`;
    const checkExist = await find('User', { email: data.email });
    if (checkExist.length) throw 'email exist';
    return create('User', data);
  },
  getById: async (id) => {
    return await getById('User', id);
  },
  updateById: async (id, data) => {
    return await updateById('User', id, data);
  }
}

module.exports = User;