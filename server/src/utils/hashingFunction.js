import crypto from "crypto"

export function shaHash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
