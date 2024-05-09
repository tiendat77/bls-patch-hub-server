import { Router } from 'express';

import upload from '@setup/storage';
import { PatchController } from '@controllers/patch.controller';
import { patchValidations, patchValidator } from '@middlewares/patch-validator';


const router = Router();

router

  /**
   * GET /api/patches
   * @summary List all patches with pagination
   * @tags Patch
   * @return {SuccessResponseModel} 200 - Response Base - application/json
   */
  .get('/', PatchController.paginate)

  /**
   * GET /api/patches/{id}
   * @summary Get patch by id
   * @tags Patch
   * @param {string} id.path.required - Patch ID
   * @return {SuccessResponseModel} 200 - Response Base - application/json
   */
  .get('/:id', PatchController.find)

  /**
   * POST /api/patches
   * @summary Create new patch
   * @tags Patch
   * @param {PatchModel} request.body.required - Request body - application/json
   * @return {SuccessResponseModel} 200 - Response Base - application/json
   */
  .post(
    '/',
    upload.single('file'),
    patchValidations(),
    patchValidator,
    PatchController.create
  )

  /**
   * PATCH /api/patches/{id}
   * @summary Update patch by id
   * @tags Patch
   * @param {PatchModel} request.body.required - Request body - application/json
   * @return {SuccessResponseModel} 200 - Response Base - application/json
   */
  .patch('/:id', PatchController.update)

  /**
   * DELETE /api/patches/{id}
   * @summary Delete patch by id
   * @tags Patch
   * @param {string} id.path.required - Patch ID
   * @return {SuccessResponseModel} 200 - Response Base - application/json
   */
  .delete('/:id', PatchController.delete);

export default router;

/**
 * @typedef {object} PatchModel
 * @property {string} name.required - Patch Name
 * @property {string} description - Patch Description
 * @property {string} version - Patch Version
 * @property {string} env - Patch Environment - Production, Staging
 * @property {string} author - Patch Author - User's email
 * @property {string} software - Patch Software
 * @property {string} path - Patch URL
 */
