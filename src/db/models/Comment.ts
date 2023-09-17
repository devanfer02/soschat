import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/db'

interface CommentAttributes {
    id: string
    postId: string
    userId: string
    commentId?: string | null
    content: string
    liked?: number
    totalChained?: number
    createdAt?: Date | null
    updatedAt?: Date | null
}

export interface CommentInput extends Optional<CommentAttributes, 'id'> { }
export interface CommentOutput extends Required<CommentAttributes> { }

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    static associate() {
        this.hasMany(Comment, {
            foreignKey: 'commentId',
            as: 'chained_comments',
            onDelete: 'CASCADE'
        })
    }

    public id!: string;
    public postId!: string;
    public userId!: string;
    public commentId?: string | null;
    public content!: string;
    public liked? : number;
    public totalChained?: number;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;
    
}

Comment.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false,
            onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            onDelete: 'CASCADE'
        },
        commentId: {
            type: DataTypes.STRING,
            allowNull: true,
            onDelete: 'CASCADE'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        liked: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        totalChained: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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

Comment.associate();

export default Comment;
export { db };