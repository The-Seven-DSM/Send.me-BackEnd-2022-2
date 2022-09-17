import { DataTypes, Model } from "sequelize";
import db from "../config/Database.config";
export class Associate extends Model{};

Associate.init(
    {
        id_associado:{
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

        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: 'associado',
        tableName: 'associado'
    }
);