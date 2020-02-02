import * as Phaser from "phaser";
import { EComponentType } from "../../types/enum";

interface ISceneObjects {
  type: string;
  object: any;
}

interface IScene {
  config: Phaser.Types.Scenes.SettingsConfig;
  instance: Phaser.Scene;
  objects: ISceneObjects[];
}

class Scene implements IScene {
  config;
  instance;
  objects = [];

  constructor(config: Phaser.Types.Scenes.SettingsConfig = {}) {
    this.setConfig(config);
  }

  setConfig(config: Phaser.Types.Scenes.SettingsConfig) {
    this.config = config;
  }

  addObject({ props }, type) {
    this.objects.push({
      type,
      props
    });
  }

  render() {
    const config = this.config;
    const objects = this.objects;
    this.instance = class extends Phaser.Scene {
      constructor() {
        super(config);
      }

      create(): void {
        for (const obj of objects) {
          switch (obj.type) {
            case EComponentType.Text:
              const { x, y, text, style } = obj.props;
              this.add.text(x, y, text, style);
              break;
          }
        }

        // var titleText: string = "Starfall";
        // this.add.text(150, 200, titleText, {
        //   font: "128px Arial Bold",
        //   fill: "#FBFBAC"
        // });

        // var hintText: string = "Click to start";
        // this.add.text(300, 350, hintText, {
        //   font: "24px Arial Bold",
        //   fill: "#FBFBAC"
        // });
      }
    };
    return this.instance;
  }
}

export default Scene;
