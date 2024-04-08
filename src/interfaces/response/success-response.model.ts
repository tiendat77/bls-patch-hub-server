import { ResponseBaseModel } from './response-base.model';

export class SuccessResponseModel implements ResponseBaseModel {

  constructor(
    public data: any = null,
    public message: string = 'Success',
    public isError: boolean = false,
    public statusCode: number = 200
  ) {
    this.data = data;
    this.message = message;
    this.isError = isError;
    this.statusCode = statusCode;
  }

}
