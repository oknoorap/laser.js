import * as Phaser from "phaser";

import { Instance as RootInstance } from ".";
import SceneInstance from "./scene";

interface IGameInstance {
  getConfig(key?: string): Phaser.Types.Core.GameConfig;
  setConfig(config: Phaser.Types.Core.GameConfig);
  getInstance();
  initScene(scene: SceneInstance);
  start(parent: HTMLElement);
}

class GameInstance implements IGameInstance {
  private instance;
  private rootInstance: RootInstance;
  private config: Phaser.Types.Core.GameConfig = {
    banner: {
      hidePhaser: false
    }
  };

  constructor(
    rootInstance: RootInstance,
    config: Phaser.Types.Core.GameConfig = {}
  ) {
    this.rootInstance = rootInstance;
    this.setConfig(config);
  }

  setConfig(config: Phaser.Types.Core.GameConfig) {
    this.config = {
      ...this.config,
      ...config
    };
  }

  getConfig(key?: string) {
    return key ? this.config[key] : this.config;
  }

  initScene(scene: SceneInstance) {
    const scenes = this.rootInstance.getScenesInstance();
    const configKeyId = "id";
    const loadedScene = scenes.find(
      item => item.getConfig(configKeyId) === scene.getConfig(configKeyId)
    );

    if (loadedScene) {
      loadedScene.init();
    }
  }

  getInstance() {
    return this.instance;
  }

  start(parent: HTMLElement): Phaser.Game {
    const scenes = this.rootInstance.getScenesInstance();
    const scene = scenes.map(scene => scene.getInstance());
    const config: Phaser.Types.Core.GameConfig = {
      ...this.config,
      scene,
      parent
    };

    class Game extends Phaser.Game {
      constructor() {
        super(config);
      }
    }

    this.instance = Game;
    return new Game();
  }
}

export default GameInstance;
