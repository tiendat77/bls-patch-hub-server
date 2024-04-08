import { ResponseBaseModel } from './response-base.model';

export class ErrorResponseModel implements ResponseBaseModel {

  constructor(
    public data: any = null,
    public message: string = 'An error occurred',
    public isError: boolean = true,
    public statusCode: number = 500
  ) {
    this.data = data;
    this.message = message;
    this.isError = isError;
    this.statusCode = statusCode;
  }

}
