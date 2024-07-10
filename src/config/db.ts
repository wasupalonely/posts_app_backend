import mongoose from "mongoose";
import env from "./config";

const connectDb = async () => {
  mongoose.set("strictQuery", false);
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASSWORD}@${env.MONGO_DB_HOST}/${env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    );
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDb;
