import { Express } from 'express';
import mongooseConnect from '../database/mongodb';

const appSetup = async (app: Express) => {
  try {
    await Promise.all([
      mongooseConnect()
    ]);

    const PORT = Number(process.env.APP_PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error: unknown) {
    console.log('Unable to start the app!');
    console.error(error);
  }
};

export default appSetup;
