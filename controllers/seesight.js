const { Seesight } = require('../entities');

const all = async () => {
  return await Seesight.all();
}

const SeesightController = {
  all,
}

module.exports = SeesightController;