import { customAlphabet } from "nanoid";

// cspell:disable-next-line
const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", 24);

export const generateId = () => nanoid();
