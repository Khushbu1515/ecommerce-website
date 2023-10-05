const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    database: 'e_commerce',
    dialect: 'mysql',
    username: 'root',
    password: 'Matrix@2022',
    logging: false
});

sequelize.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Error database: -> ", err);
});

module.exports = sequelize;