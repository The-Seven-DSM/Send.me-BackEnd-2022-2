import { Sequelize } from "sequelize";

const db = new Sequelize('api_a', 'adminUser', 'admin',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;