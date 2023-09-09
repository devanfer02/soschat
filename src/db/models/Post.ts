import { Model, DataTypes } from 'sequelize'
import db from '../../config/db'
import User from './User'

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

class Post extends Model<PostAttributes> implements PostAttributes {
    static associate() {
        this.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE'
        });
    }

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
            type: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
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

export default Post;
export { db };

