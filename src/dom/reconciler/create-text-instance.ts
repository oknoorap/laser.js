import instance from "../instance";

import { EComponentType } from "../../types/common";
import { generateId } from "../../utils/helpers";

const createTextInstance = (text: string) =>
  instance.createTextInstance({
    id: generateId(EComponentType.TextNode),
    type: EComponentType.TextNode,
    text
  });

export default createTextInstance;
