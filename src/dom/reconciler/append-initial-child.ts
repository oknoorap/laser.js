import eol from "eol";

import GameInstance from "../instance/game";
import SceneInstance from "../instance/scene";
import GameObjectInstance from "../instance/object";
import TextInstance from "../instance/text";

const appendInitialChild = (parent, child) => {
  if (parent instanceof GameInstance && child instanceof SceneInstance) {
    parent.initScene(child);
  }

  if (parent instanceof SceneInstance && child instanceof GameObjectInstance) {
    parent.addObject(child);
  }

  if (parent instanceof GameObjectInstance) {
    switch (true) {
      case child instanceof TextInstance:
        const text = (parent.getProps("text") || []).concat(child);
        parent.addChild(child, {
          text
        });
        break;

      default:
        break;
    }
  }
};

export default appendInitialChild;
