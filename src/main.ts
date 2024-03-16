import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import appSetup from './setup/app';
import routerSetup from './setup/router';
import securitySetup from './setup/security';

securitySetup(app, express);
routerSetup(app);
void appSetup(app);
