import GameObjectInstance from "../instance/object";
import SceneInstance from "../instance/scene";
import GameInstance from "../instance/game";

const commitUpdate = (
  instance: GameInstance | GameObjectInstance | SceneInstance,
  payload
) => {
  if (instance instanceof GameInstance) {
    instance.setConfig(payload);
  }

  if (instance instanceof SceneInstance) {
    instance.setConfig(payload);
  }

  if (instance instanceof GameObjectInstance) {
    instance.setProps(payload);
  }
  // instance.setProps({
  //   ...payload
  // });
};

export default commitUpdate;
