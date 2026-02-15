import { nanoid } from "nanoid";

export function generateCode(lenght = 6) {
  return nanoid(lenght);
}
