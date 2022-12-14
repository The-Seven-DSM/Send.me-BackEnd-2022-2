import { DataTypes, Model } from "sequelize";
import db from "../config/Database.config";
export class Backoffice extends Model{};

Backoffice.init(
    {
        id_back:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            onDelete: 'CASCADE',
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        datanascimento:{
            type: DataTypes.STRING,
            allowNull: false
        },
        
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: 'backoffice',
        tableName: 'backoffice'
    }
);