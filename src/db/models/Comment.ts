import { Model, DataTypes } from 'sequelize';
import db from '../../config/db'
import User from './User';
import Post from './Post';

interface CommentAttributes {
    id: number,
    postId: string,
    userId: string
    createdAt?: Date | null,
    updatedAt?: Date | null
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
    static associate() {
        this.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });

        this.belongsTo(Post, {
            foreignKey: 'postId',
            as: 'post',
            onDelete: 'CASCADE'
        });
    }

    public id!: number;
    public postId!: string;
    public userId!: string;
    public createdAt?: Date | null | undefined;
    public updatedAt?: Date | null | undefined;
    
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Comment',
        tableName: 'comments',
        underscored: false,
        timestamps: true
    }
);

export default Comment;
export { db };