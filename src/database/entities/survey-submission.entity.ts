// models/SurveySubmission.ts
import { DataTypes, Model } from 'sequelize';
import newSequelize from '../db.config';
import { SurveyAnswer } from './survey-answer.entity';

export class SurveySubmission extends Model {
  public id!: number;
  public surveyId!: number;
  public officerId!: number;
}

SurveySubmission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    surveyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    officerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: newSequelize(),
    tableName: 'survey_submissions',
  }
);

SurveySubmission.hasMany(SurveyAnswer, { foreignKey: 'submissionId' });

