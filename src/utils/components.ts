import { ReactElement } from "react";
import { deepMap } from "react-children-utilities";

export const getValidChilds = (children, childType: any) => {
  return deepMap(children, item => {
    const child = item as ReactElement;

    if (child && !child.type) {
      return null;
    }

    const type =
      typeof child.type === "function" ? (child as any).type() : child.type;

    if (type && type.type && Boolean(type.type === childType)) {
      return type;
    }

    if (Boolean(type === childType)) {
      return child;
    }
  });
};
