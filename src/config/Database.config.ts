import { Sequelize } from "sequelize";

const db = new Sequelize('send.medb', 'username', 'userpassword',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;