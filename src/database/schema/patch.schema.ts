import { Schema, model } from 'mongoose';
import { IPatch } from '../model/patch.model';

const schema = new Schema<IPatch>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    version: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: true,
    },
    env: {
      type: String,
      required: true,
    },
    software: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    sql: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IPatch>('patch', schema);
