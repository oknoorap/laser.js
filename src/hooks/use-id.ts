import { useState } from "react";
import { generateId } from "../utils/helpers";

const useID = (prefix: string = "game") => {
  const [id] = useState<string>(`${prefix}-${generateId()}`);
  return id;
};

export default useID;
