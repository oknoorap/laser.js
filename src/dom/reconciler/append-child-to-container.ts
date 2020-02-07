import GameInstance from "../instance/game";

const appendChildToContainer = (container: any, gameInstance: GameInstance) => {
  if (!gameInstance || !(gameInstance instanceof GameInstance)) {
    console.warn("The first child of game should be `<Game />` component.");
    return;
  }

  gameInstance.start(container);
};

export default appendChildToContainer;
