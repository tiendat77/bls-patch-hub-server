import { Document } from 'mongoose';

export interface IPatch extends Document {
  name: string;
  description: string | null;
  version: string | null;
  path: string;
  env: string;
  author: string;
  software: string;
  sql: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
