import { SurveySubmission } from "./entities/survey-submission.entity";
import { Survey } from "./entities/survey.entity";
import { IUser } from "./entities/user.entity";

export interface IDbService {
    createUser(data: any): Promise<IUser>;
    getUser(email: string): Promise<IUser | null>;
    createSurvey(data: { title: string; description?: string; createdBy: number }): Promise<Survey>;
    createField(data: any): Promise<any>;
    findAllSurveys(): Promise<Survey[]>;
    createSubmission(data: { surveyId: number; officerId: number }): Promise<SurveySubmission>;
    createAnswer(data: any): Promise<any>;
    findSubmissionsBySurvey(surveyId: number): Promise<any[]>;
}