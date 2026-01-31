// models/SurveyField.ts
import { DataTypes, Model } from 'sequelize';
import newSequelize from '../db.config';
import { SurveyAnswer } from './survey-answer.entity';

export class SurveyField extends Model {
  public id!: number;
  public surveyId!: number;
  public label!: string;
  public type!: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'SELECT';
  public required!: boolean;
  public options?: string[];
}

SurveyField.init(
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
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('TEXT', 'CHECKBOX', 'RADIO', 'SELECT'),
      allowNull: false,
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize: newSequelize(),
    tableName: 'survey_fields',
  }
);

SurveyField.hasMany(SurveyAnswer, { foreignKey: 'fieldId' });

