import { Request, Response } from 'express';
import { IPatch } from '@database/model';
import { PatchSchema } from '@database/schema';
import { ErrorResponseModel, SuccessResponseModel } from '@interfaces/response';


export class PatchController {

  static async list(req: Request, res: Response) {
    const patches = await PatchSchema.find({});
    res
      .status(200)
      .send(new SuccessResponseModel(patches));
  }

  static async find(req: Request, res: Response) {
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
  }

  static async create(req: Request, res: Response) {
    const model = new PatchSchema(req.body);
    model.path = `static/${req.file?.filename ?? ''}`;
    await model.save();

    res
      .status(201)
      .send(new SuccessResponseModel(model));
  }

  static async update(req: Request, res: Response) {
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
  }

  static async delete(req: Request, res: Response) {
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

    await PatchSchema.findOneAndDelete({ _id: id });

    res
      .status(200)
      .send(new SuccessResponseModel(true, 'Patch removed!'));
  }

}
