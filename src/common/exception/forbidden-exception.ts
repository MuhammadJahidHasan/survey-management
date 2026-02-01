export class ForbiddenException extends Error {

    private statusCode;
    private isCustomError;

    constructor(private customMessage: string, private errors?: string[]) {
        super(customMessage);
        this.customMessage = customMessage;
        this.errors = errors;
        this.statusCode = 403;
        this.isCustomError = true;
    }

}