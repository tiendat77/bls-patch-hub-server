import { Router } from 'express';

import upload from '@setup/storage';
import { PatchController } from '@controllers/patch.controller';
import { patchValidations, patchValidator } from '@middlewares/patch-validator';


const router = Router();

router

  /**
   * GET /api/patches
   * List all patches
   */
  .get('/', PatchController.list)

  /**
   * GET /api/patches/:id
   * Get patch by id
   */
  .get('/:id', PatchController.find)

  /**
   * POST /api/patches
   * Create a new patch
   */
  .post(
    '/',
    upload.single('file'),
    patchValidations(),
    patchValidator,
    PatchController.create
  )

  /**
   * PATCH /api/patches/:id
   * Update patch by id
   */
  .patch('/:id', PatchController.update)

  /**
   * DELETE /api/patches/:id
   * Delete patch by id
   */
  .delete('/:id', PatchController.delete);

export default router;
