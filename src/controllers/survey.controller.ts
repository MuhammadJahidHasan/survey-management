import { ISurveyService } from "../services/survey.service";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { BaseController } from "./base.controller";


export class SurveyController extends BaseController{
    private readonly surveyService;

    constructor(surveyService: ISurveyService) {
        super();
        this.surveyService = surveyService;
        this.createSurvey = this.createSurvey.bind(this);
        this.listSurveys = this.listSurveys.bind(this);
        this.viewSubmissions = this.viewSubmissions.bind(this);
        this.submitSurvey = this.submitSurvey.bind(this);
     }

    async createSurvey(req: AuthRequest, res: Response) {
        const adminId = req.user!.id;
        const survey = await this.surveyService.createSurvey(adminId, req.body);
        this.sendResponse(201, 'Successfully created', survey, res);
    }

    async listSurveys(req: Request, res: Response) {
        const surveys = await this.surveyService.listSurveys();
        this.sendResponse(200, 'List of survey', surveys, res);
        
    }

    async viewSubmissions(req: AuthRequest, res: Response) {
        const { surveyId } = req.params;
        const submissions = await this.surveyService.getSurveySubmissions(+surveyId);
        res.json(submissions);
    }

    async submitSurvey(req: AuthRequest, res: Response) {
        const officerId = req.user!.id;
        const { surveyId, answers } = req.body;

        const submission = await this.surveyService.submitSurvey(
            officerId,
            surveyId,
            answers
        );

        res.status(201).json(submission);
    }

    sendResponse(statusCode: number, message: string, data: any, res: Response) {
        res.status(statusCode).json({ message, data });
    }

}

export const getSurveyController = async (surveyService: ISurveyService): Promise<SurveyController> => {
    return new SurveyController(surveyService);

}