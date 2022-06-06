import { MongoClient } from 'mongodb';

// Server
const connectionUrl =
  process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017';

// Database
export const database = process.env.MONGODB_DATABASE || 'myDatabase';

// Connection
export const connector = new MongoClient(connectionUrl);
