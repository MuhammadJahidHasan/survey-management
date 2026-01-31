// models/Survey.ts
import { DataTypes, Model } from 'sequelize';
import { SurveyField } from './survey-field.entity';
import { SurveySubmission } from './survey-submission.entity';
import newSequelize from '../db.config';

export class Survey extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public createdBy!: number;
}

Survey.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: newSequelize(),
    tableName: 'surveys',
  }
);

Survey.hasMany(SurveyField, { foreignKey: 'surveyId' });
Survey.hasMany(SurveySubmission, { foreignKey: 'surveyId' });

