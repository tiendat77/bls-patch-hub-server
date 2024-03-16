import { connect } from 'mongoose';

async function mongooseConnect(): Promise<void> {
  const mongoURI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/patches';
  await connect(mongoURI).then(() => {
    console.log('MongoDB connected successfully!');
  });
}

export default mongooseConnect;
