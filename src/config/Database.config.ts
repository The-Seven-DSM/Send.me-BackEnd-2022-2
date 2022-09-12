import { Sequelize } from "sequelize";

const db = new Sequelize('send.medb', 'username', 'password',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;