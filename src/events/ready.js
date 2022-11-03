const utils = require('../utils');

module.exports = async (client) => {
  utils.log(`Logged in as ${client.user.tag}!`, "success");
}