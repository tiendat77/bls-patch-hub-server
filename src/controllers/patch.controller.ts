import { Request, Response } from 'express';
import { IPatch } from '@database/model';
import { PatchSchema } from '@database/schema';

import fs from 'fs';
import logger from '@helpers/logger.helper';

import {
  PagingResponseModel,
  ErrorResponseModel,
  SuccessResponseModel
} from '@interfaces/response';


export class PatchController {

  static async list(req: Request, res: Response) {
    try {
      const patches = await PatchSchema.find({});
      res
        .status(200)
        .send(new SuccessResponseModel(patches));

    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

  static async paginate(req: Request, res: Response) {
    try {
      const {
        page = 1,
        size = 10,
        search = null,
      } = req.query;

      const aggregate = await PatchSchema.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: search ?? '', $options: 'i' } },
              { description: { $regex: search ?? '', $options: 'i' } },
              { version: { $regex: search ?? '', $options: 'i' } },
            ]
          }
        },
        {
          $facet: {
            list: [
              { $skip: Number(size) * (Number(page) - 1) },
              { $limit: Number(size) }
            ],
            meta: [
              { $count: 'total' }
            ],
          }
        }
      ]);

      const response: PagingResponseModel<IPatch> = {
        list: aggregate[0].list,
        total: aggregate[0].meta[0]?.total ?? 0,
      };

      res
        .status(200)
        .send(new SuccessResponseModel(response));

    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

  static async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .send(new ErrorResponseModel(null, 'Required parameter "id" is missing!'));
      }

      const record = await PatchSchema.findById(id);

      if (!record) {
        return res
          .status(404)
          .send(new ErrorResponseModel(null, `Patch with id: ${id} was not found.`));
      }

      res
        .status(200)
        .send(new SuccessResponseModel(record));

    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const model = new PatchSchema(req.body);
      model.path = `static/${req.file?.filename ?? ''}`;
      await model.save();

      res
        .status(201)
        .send(new SuccessResponseModel(model));

    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .send(new ErrorResponseModel(null, 'Required parameter "id" is missing!'));
      }

      const record = await PatchSchema.findById(id);

      if (!record) {
        return res
          .status(404)
          .send(new ErrorResponseModel(null, `Patch with id: ${id} was not found.`));
      }

      const changes: Partial<IPatch> = req.body;
      changes.updatedAt = new Date();

      const updatedPatch = await PatchSchema.findOneAndUpdate(
        { _id: id },
        { $set: { ...changes } },
        { new: true }
      );

      res
        .status(200)
        .send(new SuccessResponseModel(updatedPatch));
    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .send(new ErrorResponseModel(null, 'Required parameter "id" is missing!'));
      }

      const record = await PatchSchema.findById(id);

      if (!record) {
        return res
          .status(404)
          .send(new ErrorResponseModel(null, `Patch with id: ${id} was not found.`));
      }

      // Remove the file from the storage
      try {
        fs.unlinkSync(`public/uploads/${record.path?.replace(/^static\//, '')}`);
      } catch (error) {
        logger.error(error);
      }

      // Remove the record from the database
      await PatchSchema.findOneAndDelete({ _id: id });

      res
        .status(200)
        .send(new SuccessResponseModel(true, 'Patch removed!'));

    } catch (error) {
      logger.error(error);

      res
        .status(500)
        .send(new ErrorResponseModel(null, 'Unexpected error occurred!'));
    }
  }

}
