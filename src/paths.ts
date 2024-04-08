import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@interfaces': `${__dirname}/interfaces`,
  '@constants': `${__dirname}/constants`,
  '@helpers': `${__dirname}/helpers`,
  '@controllers': `${__dirname}/controllers`,
  '@database': `${__dirname}/database`,
  '@middlewares': `${__dirname}/middlewares`,
  '@routers': `${__dirname}/routers`,
  '@setup': `${__dirname}/setup`,
});
