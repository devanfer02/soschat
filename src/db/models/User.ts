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
    photo?: string | null,
    following?: number,
    followers?: number,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {

    public id!: string;
    public fullname!: string;
    public username!: string;
    public password!: string;
    public email!: string;
    public photo?: string;
    public following?: number;
    public followers?: number;
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
        photo: {
            type: DataTypes.STRING,
            allowNull: true
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

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'user_posts',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

User.hasMany(Follow, {
    foreignKey: 'followerId',
    as: 'user_followers',
    onDelete: 'CASCADE'
});

User.hasMany(Follow, {
    foreignKey: 'followingId',
    as: 'user_following',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'user_comments',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

export default User;
export { db };