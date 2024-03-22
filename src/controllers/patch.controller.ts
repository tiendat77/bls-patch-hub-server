import { Request, Response } from 'express';
import { IPatch } from '../database/model/patch.model';
import PatchSchema from '../database/schema/patch.schema';

export class PatchController {

  /**
   * @description List all patches
   */
  static async list(req: Request, res: Response) {
    const patches = await PatchSchema.find({});
    res.send(patches);
  }

  /**
   * @description Get patch by id
   */
  static async find(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchSchema.findById(id);

    if (!record) {
      return res.status(404).send({ message: `Patch with id: ${id} was not found.` });
    }

    res.send(record);
  }

  static async create(req: Request, res: Response) {
    const model = new PatchSchema(req.body);
    model.path = `static/${req.file?.filename ?? ''}`;
    await model.save();

    res.status(201).send(model);
  }

  /**
   * @description Update patch by id
   */
  static async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchSchema.findById(id);

    if (!record) {
      return res
        .status(404)
        .send({ message: `Patch with id: ${id} was not found.` });
    }

    const changes: Partial<IPatch> = req.body;
    changes.updatedAt = new Date();

    const updatedPatch = await PatchSchema.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updatedPatch);
  }

  /**
   * @description Delete patch by id
   */
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchSchema.findById(id);

    if (!record) {
      return res
        .status(404)
        .send({ message: `Patch with id: ${id} was not found.` });
    }

    await PatchSchema.findOneAndDelete({ _id: id });

    res.send({ message: 'Patch removed!' });
  }

}
