import eol from "eol";

import SceneManager from "../managers/scene";
import ObjectManager from "../managers/object";
import { EComponentType } from "../../types/enum";
import { isComponentType } from "../../utils/helpers";

const appendInitialChild = (sceneManagers: SceneManager[]) => (
  parent: any,
  child: any
) => {
  if (child instanceof SceneManager) {
    sceneManagers.push(child);
  }

  if (parent instanceof SceneManager && child instanceof ObjectManager) {
    const isText = isComponentType(child, EComponentType.Text);

    switch (true) {
      case isText:
        parent.addObject(child, EComponentType.Text);
        break;

      default:
        break;
    }
  }

  if (parent instanceof ObjectManager) {
    const isText = isComponentType(parent, EComponentType.Text);

    switch (true) {
      case isText && typeof child === "string":
        parent.setProps({
          text: eol.split(child as string)
        });
        break;

      default:
        break;
    }
  }
};

export default appendInitialChild;
