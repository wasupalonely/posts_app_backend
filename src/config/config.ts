import * as dotenv from 'dotenv';
import { cleanEnv, str, port, url, host } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port(),
  SOCKET_PORT: port(),
  MONGO_DB_HOST: str(),
  MONGO_DB_USER: str(),
  MONGO_DB_PASSWORD: str(),
  MONGO_DB_NAME: str(),
  JWT_SECRET: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  EMAIL_MAILER: str(),
  PASSWORD_MAILER: str(),
  RECOVER_PASSWORD_SECRET: str(),
});

export default env;
