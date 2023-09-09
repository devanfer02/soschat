import { Model, DataTypes } from 'sequelize';
import db from '../../config/db'
import User from './User';

interface FollowAttributes {
    id: number,
    followerId: string,
    followingId: string,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

class Follow extends Model<FollowAttributes> implements FollowAttributes {
    static associate() {
        this.belongsTo(User, {
            foreignKey: 'followerId',
            as: 'followers',
            onDelete: 'CASCADE'
        });

        this.belongsTo(User, {
            foreignKey: 'followingId',
            as: 'following',
            onDelete: 'CASCADE'
        });
    }

    public id!: number;
    public followerId!: string;
    public followingId!: string;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;
}

Follow.init(
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        followerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        followingId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,   
        modelName: 'Follow',
        tableName: 'follows',
        underscored: false,
        timestamps: true
    }
);

export default Follow;
export { db };