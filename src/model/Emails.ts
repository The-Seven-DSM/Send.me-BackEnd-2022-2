import { DataTypes, Model } from "sequelize";
import db from "../config/Database.config";
import { Associate } from "./Associate";
export class Emails extends Model{};

Emails.init(
    {
        id_email:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        corpo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pagina: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        envio:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: 'email',
        tableName: 'email'
    }
);

Emails.belongsTo(Associate,{foreignKey: 'fk_id_associado'});
Associate.hasMany(Emails,{foreignKey: 'fk_id_associado'});