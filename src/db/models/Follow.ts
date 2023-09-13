import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../config/db'
import User from './User';

interface FollowAttributes {
    id: number,
    followerId: string,
    followingId: string,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

export interface FollowInput extends Optional<FollowAttributes, 'id'> { }
export interface FollowOutput extends Required<FollowAttributes> { }

class Follow extends Model<FollowAttributes, FollowInput> implements FollowAttributes {
    static associate() {
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

Follow.associate();

export default Follow;
export { db };