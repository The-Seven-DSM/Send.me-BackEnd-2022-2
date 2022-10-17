import { Sequelize } from "sequelize";

const db = new Sequelize('api_a', 'root', '1234',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;