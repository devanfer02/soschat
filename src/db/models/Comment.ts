import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/db'

interface CommentAttributes {
    id: number,
    postId: string,
    userId: string
    createdAt?: Date | null,
    updatedAt?: Date | null
}

export interface CommentInput extends Optional<CommentAttributes, 'id'> { }
export interface CommentOutput extends Required<CommentAttributes> { }

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
    static associate() {

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