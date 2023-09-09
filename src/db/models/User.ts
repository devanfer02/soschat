import { Model, DataTypes } from 'sequelize';
import db from '../../config/db';

interface UserAttributes {
    id: string,
    fullname: string,
    username: string,
    password: string,
    email: string,
    following?: number | 0,
    followers?: number | 0,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public fullname!: string;
    public username!: string;
    public password!: string;
    public email!: string;
    public following?: number | 0;
    public followers?: number | 0;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;
};

User.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        following: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        followers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize: db,
        modelName: 'User',
        tableName: 'users',
        underscored: false,
        timestamps: true
    }
);

export default User;
export { db };