import { mkdirSync } from 'fs';
import { Express } from 'express';
import mongooseConnect from '@database/mongodb';

const appSetup = async (app: Express) => {
  try {
    /**
     * Connect to the database
     */
    await Promise.all([
      mongooseConnect()
    ]);

    /**
     * Create public folder
     */
    mkdirSync('public/uploads', { recursive: true });
    mkdirSync('public/download', { recursive: true });

    const PORT = process.env.APP_PORT || 3000;

    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });

  } catch (error: unknown) {
    console.log('❌ Unable to start the app!');
    console.error(error);
  }
};

export default appSetup;
