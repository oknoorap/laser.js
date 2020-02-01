import * as Phaser from "phaser";

interface IScene {
  config: Phaser.Types.Scenes.SettingsConfig;
  instance: Phaser.Scene;
}

class Scene implements IScene {
  config;
  instance;

  constructor(config: Phaser.Types.Scenes.SettingsConfig = {}) {
    this.setConfig(config);
  }

  setConfig(config: Phaser.Types.Scenes.SettingsConfig) {
    this.config = config;
  }

  render() {
    const config = this.config;
    this.instance = class extends Phaser.Scene {
      constructor() {
        super(config);
      }

      create(): void {
        var titleText: string = "Starfall";
        this.add.text(150, 200, titleText, {
          font: "128px Arial Bold",
          fill: "#FBFBAC"
        });

        var hintText: string = "Click to start";
        this.add.text(300, 350, hintText, {
          font: "24px Arial Bold",
          fill: "#FBFBAC"
        });
      }
    };
    return this.instance;
  }
}

export default Scene;
