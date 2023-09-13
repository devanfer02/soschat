import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/db';
import Post from './Post';
import Follow from './Follow';
import Comment from './Comment';

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

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    static associate() {
        this.hasMany(Post, {
            foreignKey: 'userId',
            as: 'user_posts',
            onDelete: 'CASCADE'
        });
        
        this.hasMany(Follow, {
            foreignKey: 'followerId',
            as: 'user_followers',
            onDelete: 'CASCADE'
        });

        this.hasMany(Follow, {
            foreignKey: 'followingId',
            as: 'user_following',
            onDelete: 'CASCADE'
        });

        this.hasMany(Comment, {
            foreignKey: 'userId',
            as: 'user_comments',
            onDelete: 'CASCADE'
        });

    }

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

User.associate();

export default User;
export { db };