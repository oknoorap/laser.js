import GameManager from "../managers/game";
import SceneManager from "../managers/scene";

const appendChildToContainer = sceneManagers => (
  container: any,
  gameInstance
) => {
  if (!gameInstance || !(gameInstance instanceof GameManager)) {
    console.warn("The first child of game should be `<Game />` component.");
  }

  const game = gameInstance as GameManager;

  for (const scene of sceneManagers) {
    game.addScene((scene as SceneManager).render());
  }

  game.setContainer(container);
  game.render();
};

export default appendChildToContainer;
