import SceneEvent, { ESceneEventType } from "../events/scene";

const changeScene = (scene: string) => {
  SceneEvent.send({
    type: ESceneEventType.ChangeScene,
    scene
  });
};

export default {
  changeScene
};
