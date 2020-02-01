import { useState } from "react";
import { generateId } from "../utils/helpers";

const useID = (prefix: string = "game") => {
  const separator = prefix ? "-" : null;
  const [id] = useState<string>(`${prefix}${separator}${generateId()}`);
  return id;
};

export default useID;
