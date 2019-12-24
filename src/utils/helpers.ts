import generate from "nanoid/generate";
import { ID_ALPHABET, ID_LENGTH } from "./fixtures";

export const generateId = (): string => generate(ID_ALPHABET, ID_LENGTH);
