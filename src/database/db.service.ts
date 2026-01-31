import { IDbService } from "./db.interface";
import { SurveyAnswer } from "./entities/survey-answer.entity";
import { SurveyField } from "./entities/survey-field.entity";
import { SurveySubmission } from "./entities/survey-submission.entity";
import { Survey } from "./entities/survey.entity";
import User, { IUser } from "./entities/user.entity";

class DbService implements IDbService {
    async createUser(data: any): Promise<IUser> {
        return await User.create({
            name: data.name,
            email: data.email,
            passwordHash: data.hashedPassword,
            role: data.role,
        });
    }
    async getUser(email: string): Promise<IUser | null> {
        return await User.findOne({
            where: { email },
        });
    }
    async createSurvey(data: { title: string; description?: string; createdBy: number }) {
        return Survey.create(data);
      }
    
      async createField(data: any) {
        return SurveyField.create(data);
      }
    
      async findAllSurveys() {
        return Survey.findAll({ include: [SurveyField] });
      }
    
      async createSubmission(data: { surveyId: number; officerId: number }) {
        return SurveySubmission.create(data);
      }
    
      async createAnswer(data: any) {
        return SurveyAnswer.create(data);
      }
    
      async findSubmissionsBySurvey(surveyId: number) {
        return SurveySubmission.findAll({
          where: { surveyId },
          include: [SurveyAnswer],
        });
      }
}

export const getDbService = (): IDbService => {
    return new DbService();
}