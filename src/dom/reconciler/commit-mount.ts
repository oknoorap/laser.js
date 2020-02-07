import GameObjectInstance from "../instance/object";
import SceneInstance from "../instance/scene";
import GameInstance from "../instance/game";

import { getPropsAttr } from "../../utils/helpers";

const commitMount = (
  instance: GameInstance | GameObjectInstance | SceneInstance,
  type,
  newProps
) => {
  const props = getPropsAttr(newProps);

  if (instance instanceof GameInstance) {
    instance.setConfig(props);
  }

  if (instance instanceof SceneInstance) {
    instance.setConfig(props);
  }

  if (instance instanceof GameObjectInstance) {
    instance.setProps(props);
  }
};

export default commitMount;
