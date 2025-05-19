import dotenv from "dotenv";
dotenv.config();

const env = process.env;

export const JWT_SECRET_KEY = env.JWT_SECRET_KEY;
export const BCRYPT_SALT = Number(env.BCRYPT_SALT);
export const JWT_LIFETIME = Number(env.JWT_LIFETIME);