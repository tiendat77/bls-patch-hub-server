import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ErrorResponseModel } from '@interfaces/response';

export const patchValidations = () => {
  return [
    body('name', 'Name must be a string').isString().trim(),
    body('name', 'Name cannot be empty').not().isEmpty(),
    body('env', 'Env must be a string').isString().trim(),
    body('env', 'Env can not be empty').not().isEmpty(),
    body('software', 'Software must be a string').isString().trim(),
    body('software', 'Software can not be empty').not().isEmpty(),
    body('description', 'Description must be a string').isString().trim(),
    body('version', 'Version must be a string').isString().trim(),
    body('author', 'Author must be a string').isString().trim(),
    body('file', 'File is required').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('File is required');
      }
      return true;
    })
  ];
};

export const patchValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res
      .status(400)
      .send(new ErrorResponseModel(errors.array(), 'Validation failed', true, 400));
  }

  next();
};
