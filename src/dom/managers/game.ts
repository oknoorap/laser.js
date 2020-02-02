import * as Phaser from "phaser";

interface IGame {
  container: HTMLElement;
  config: Phaser.Types.Core.GameConfig;
  instance: Phaser.Game;
  scenes: Phaser.Scene[];
}

class Game implements IGame {
  config: Phaser.Types.Core.GameConfig = {
    banner: {
      hidePhaser: false
    }
  };
  container;
  instance;
  scenes = [];

  constructor(
    config: Phaser.Types.Core.GameConfig = {},
    container?: HTMLElement
  ) {
    this.setConfig(config);

    if (container) {
      this.setContainer(container);
    }
  }

  setConfig(config: Phaser.Types.Core.GameConfig) {
    this.config = {
      ...this.config,
      ...config
    };
  }

  setContainer(container: HTMLElement) {
    this.container = container;
  }

  addScene(scene: Phaser.Scene) {
    this.scenes.push(scene);
  }

  render() {
    const config: Phaser.Types.Core.GameConfig = {
      ...this.config,
      parent: this.container,
      scene: this.scenes
    };

    this.instance = class extends Phaser.Game {
      constructor() {
        super(config);
      }
    };

    return new this.instance();
  }
}

export default Game;
