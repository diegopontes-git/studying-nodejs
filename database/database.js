const Sequelize = require("sequelize");
// @ts-ignore
const connection = new Sequelize('banco_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = connection;