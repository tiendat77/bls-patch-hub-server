import cors from 'cors';
import { Express } from 'express';

const securitySetup = (app: Express, express: any) =>
  app
  .use(cors())
  .use(express.json({limit: '25mb'}))
  .use(express.urlencoded({extended: true, limit: '25mb'}))
  .use('/static', express.static('public/uploads'));

export default securitySetup;
