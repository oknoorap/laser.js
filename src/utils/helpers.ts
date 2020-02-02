import generate from "nanoid/generate";
import { ID_ALPHABET, ID_LENGTH } from "./constants";

export const getTypeAttr = obj => obj["data-type"];

export const getPropsAttr = obj => obj["data-props"];

export const generateId = (prefix?: string): string =>
  (prefix ? `${prefix}-` : "") + generate(ID_ALPHABET, ID_LENGTH);

export const isComponentType = (obj: any, compare) =>
  obj.props.type === compare;
