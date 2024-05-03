import { Express, Request, Response } from 'express';
import patchRouter from '@routers/patch.router';

const routerSetup = (app: Express) =>
  app
  .get('/', async (req: Request, res: Response) => {
    const version = process.env.npm_package_version;
    res.send('Welcome to the API! Version: ' + version);
  })
  .use('/api/patches', patchRouter);

export default routerSetup;

/**
 * Success response model
 * @typedef {object} SuccessResponseModel
 * @property {object} data - Response data
 * @property {string} message - Success message
 * @property {boolean} isError - Error flag - default: false
 * @property {number} statusCode - HTTP status code - default: 200
 */

/**
 * Error response model
 * @typedef {object} ErrorResponseModel
 * @property {object} data - Response data - default: null
 * @property {string} message - Error message
 * @property {boolean} isError - Error flag - default: true
 * @property {number} statusCode - HTTP status code - default: 500
 */
