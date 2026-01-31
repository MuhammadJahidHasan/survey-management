// models/SurveyAnswer.ts
import { DataTypes, Model } from 'sequelize';
import newSequelize from '../db.config';

export class SurveyAnswer extends Model {
  public id!: number;
  public submissionId!: number;
  public fieldId!: number;
  public value!: any;
}

SurveyAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    submissionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    fieldId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: newSequelize(),
    tableName: 'survey_answers',
  }
);
