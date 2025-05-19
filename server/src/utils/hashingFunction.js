import crypto from "crypto";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../configs/auth.config.js";

export function shaHash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function shaCompare(enteredPassword, hashedPassword) {
    return shaHash(enteredPassword) === hashedPassword;
}

export async function bcryptHash(password) {
    return await bcrypt.hash(password, BCRYPT_SALT);
}

export async function bcryptCompare(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}