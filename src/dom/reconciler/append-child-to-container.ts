import GameManager from "../managers/game";
import SceneManager from "../managers/scene";
import SceneEvents, { ESceneEventType } from "../../events/scene";

const appendChildToContainer = (sceneManagers: SceneManager[]) => (
  container: any,
  gameInstance
) => {
  if (!gameInstance || !(gameInstance instanceof GameManager)) {
    console.warn("The first child of game should be `<Game />` component.");
  }

  const game = gameInstance as GameManager;
  const [firstScene] = sceneManagers;

  for (const scene of sceneManagers) {
    game.addScene((scene as SceneManager).render());
  }

  // Start all events.
  SceneEvents.start();

  if (firstScene) {
    SceneEvents.send({
      type: ESceneEventType.SetCurrentScene,
      scene: firstScene.config.name
    });
  }

  // Start game.
  game.setContainer(container);
  game.render();
};

export default appendChildToContainer;
