import { Sequelize } from "sequelize";

const db = new Sequelize('api_a', 'root', 'admin',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;