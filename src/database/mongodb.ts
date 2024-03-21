import { connect } from 'mongoose';

async function mongooseConnect(): Promise<void> {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB,
  } = process.env;

  await connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`).then(() => {
    console.log('MongoDB connected successfully!');
  });
}

export default mongooseConnect;
