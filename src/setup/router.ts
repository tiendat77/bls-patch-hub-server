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
