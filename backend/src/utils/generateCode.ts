import { nanoid } from "nanoid";

export function generateCode(length = 4) {
  return nanoid(length);
}
