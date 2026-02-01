import { IDbService } from "../database/db.interface"
import { BadRequestException } from "../common/exception/bad-request-exception";

export interface ISurveyService {
    createSurvey(
        adminId: number,
        payload: {
            title: string;
            description?: string;
            fields: any[];
        }
    ): Promise<any>;

    listSurveys(): Promise<any>;
     
    submitSurvey(
        officerId: number,
        surveyId: number,
        answers: any[]
    ): Promise<any>;

    getSurveySubmissions(surveyId: number): Promise<any>


}

class SurveyService implements ISurveyService{
    constructor(private readonly dbService: IDbService) { }

    async createSurvey(
        adminId: number,
        payload: {
            title: string;
            description?: string;
            fields: any[];
        }
    ) {


        // TODO: Need to database transaction here for create survey and field
        const survey = await this.dbService.createSurvey({
            title: payload.title,
            description: payload.description,
            createdBy: adminId,
        });

        for (const field of payload.fields) {
            await this.dbService.createField({
                surveyId: survey.id,
                ...field,
            });
        }

        return survey;
    }

    async listSurveys() {
        return this.dbService.findAllSurveys();
    }

    async submitSurvey(
        officerId: number,
        surveyId: number,
        answers: any[]
    ) {
        if (!answers || answers.length === 0) {
            throw new BadRequestException('Answers are required');
        }

        // TODO: Need to database transaction here for create submission and answer
        const submission = await this.dbService.createSubmission({
            surveyId,
            officerId,
        });

        for (const ans of answers) {
            await this.dbService.createAnswer({
                submissionId: submission.id,
                fieldId: ans.fieldId,
                value: ans.value,
            });
        }

        return submission;
    }

    async getSurveySubmissions(surveyId: number) {
        return this.dbService.findSubmissionsBySurvey(surveyId);
    }

}

export const getSurveyService = async (dbService: IDbService): Promise<ISurveyService> => {
    return new SurveyService(dbService)
}