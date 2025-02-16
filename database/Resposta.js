const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('respostas', {
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;