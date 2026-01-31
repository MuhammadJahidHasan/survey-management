import {
    DataTypes,
    Model,
    Optional,
  } from 'sequelize';

import newSequelize from '../db.config';
  
  export interface IUser {
    id?: number;
    name?: string;
    email: string;
    passwordHash: string;
    role: 'ADMIN' | 'OFFICER';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  
  class User extends Model<IUser> implements IUser
  {
    public id!: number;
    public name?: string;
    public email!: string;
    public passwordHash!: string;
    public role!: 'ADMIN' | 'OFFICER';
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
  
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
  
      passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  
      role: {
        type: DataTypes.ENUM('ADMIN', 'OFFICER'),
        allowNull: false,
      },
    },
    {
      sequelize: newSequelize(),
      tableName: 'users',
      modelName: 'User',
    }
  );
  
  export default User;
  