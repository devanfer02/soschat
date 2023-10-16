import { Model, DataTypes, Optional } from 'sequelize'
import db from '../../config/db'
import Comment from './Comment';

interface PostAttributes {
    id: string,
    userId: string,
    title: string,
    desc: string,
    image?: string | null,
    comments?: number | 0,
    liked?: number | 0,
    createdAt? : Date | null,
    updatedAt? : Date | null
}

export interface PostInput extends Optional<PostAttributes, 'id'> { }
export interface PostOutput extends Required<PostAttributes> { }

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {

    public id!: string;
    public userId!: string;
    public title!: string;
    public desc!: string;
    public image?: string | null;
    public comments?: number | 0;
    public liked?: number | 0;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;
}

Post.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        liked: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, 
    {
        sequelize: db,
        modelName: 'Post',
        tableName: 'posts',
        underscored: false,
        timestamps: true
    }
);


Post.hasMany(Comment, {
    foreignKey: 'postId',
    as: 'post_comments',
    onDelete: 'CASCADE'
});

export default Post;
export { db };

