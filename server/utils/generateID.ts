import { customAlphabet } from "nanoid";
import nanoidDictionary from "nanoid-dictionary";

function generateID(length: number) {
  const generateUUID = customAlphabet(nanoidDictionary.numbers, length);
  return generateUUID();
}

export default generateID;
