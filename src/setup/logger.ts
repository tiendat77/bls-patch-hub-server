import { Express } from 'express';
import { logger } from 'express-winston';
import { transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const loggerSetup = (app: Express) => {
  app.use(
    logger({
      transports: [
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
        }),
        new transports.Console(),
      ],
      format: format.combine(
        format.json()
      ),
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }),
  );
};

export default loggerSetup;
