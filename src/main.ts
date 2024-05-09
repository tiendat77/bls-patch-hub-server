import './paths';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import appSetup from '@setup/app';
import securitySetup from '@setup/security';
import swaggerSetup from '@setup/swagger';
import routerSetup from '@setup/router';

securitySetup(app, express);
swaggerSetup(app);
routerSetup(app);
void appSetup(app);

console.log(`

                 %%%%%
              %%%%%%%%  *
             %%%%%%%%%  *****
             %%%% %%%%  ********
         %%  %%%  %%%%  ******+**
       %%%%  %%%  %%%%  ***  +***
       %%%%  %%%  %%%%  ***  ****
       %%%%  %%%  %%%%  *+*  ****
       %%%%  %%%  %%%%  ***  +***
       %%%%  %%%  %%%%  ***  ****
       %%%%  %%%  %%%%  ***  ****
       %%%%%%%%%  %%%%  ***
        %%%%%%%%  %%%%  ***
           %%%%%  %%%%  +**
              %%  %%%%  **
                  %%%%

        Starting PatchHub Server
`);
