import { ReactElement } from "react";
import reconciler from "./reconciler";

const render = (
  reactElement: ReactElement,
  domElement,
  callback?: () => void
) => {
  if (!domElement) {
    domElement = document.createElement("div");
  }

  const container = reconciler.createContainer(domElement, false, false);
  reconciler.updateContainer(reactElement, container, null, callback);
};

export default render;
