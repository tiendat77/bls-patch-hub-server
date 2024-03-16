import { Express, Request, Response } from 'express';
import usersRouter from '../controllers/user.controller';

const routerSetup = (app: Express) =>
  app
  .get('/', async (req: Request, res: Response) => {
    const version = process.env.npm_package_version;
    res.send('Welcome to the API! Version: ' + version);
  })
  .use('/api/users', usersRouter);

export default routerSetup;
