import { Router, Request, Response } from 'express';
import { IPatch } from '../database/model/patch.model';
import PatchModel from '../database/schema/patch.schema';

const controller = Router();

controller

  /**
   * GET /api/patches
   * List all patches
   */
  .get('/', async (req: Request, res: Response) => {
    const patches = await PatchModel.find({});
    res.send(patches);
  })

  /**
   * GET /api/patches/:id
   * Get patch by id
   */
  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchModel.findById(id);

    if (!record) {
      return res.status(404).send({ message: `Patch with id: ${id} was not found.` });
    }

    res.send(record);
  })

  /**
   * POST /api/patches
   * Create a new patch
   */
  .post('/', async (req: Request, res: Response) => {
    const model = new PatchModel(req.body);
    model.createdAt = new Date();
    model.updatedAt = new Date();

    await model.save();

    res.status(201).send(model);
  })

  /**
   * PATCH /api/patches/:id
   * Update patch by id
   */
  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchModel.findById(id);

    if (!record) {
      return res
        .status(404)
        .send({ message: `Patch with id: ${id} was not found.` });
    }

    const changes: Partial<IPatch> = req.body;
    changes.updatedAt = new Date();

    const updatedPatch = await PatchModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updatedPatch);
  })

  /**
   * DELETE /api/patches/:id
   * Delete patch by id
   */
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const record = await PatchModel.findById(id);

    if (!record) {
      return res
        .status(404)
        .send({ message: `Patch with id: ${id} was not found.` });
    }

    await PatchModel.findOneAndDelete({ _id: id });

    res.send({ message: 'Patch removed!' });
  });

export default controller;
