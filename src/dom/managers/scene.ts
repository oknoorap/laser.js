import * as Phaser from "phaser";
import isFunction from "lodash/isFunction";
import isEmpty from "lodash/isEmpty";

import SceneEvents, { ESceneState, ESceneEventType } from "../../events/scene";
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
      updateCallback: (time?: number) => void = () => null;

      constructor() {
        super(config);
        this.subscribe();
      }

      subscribe() {
        SceneEvents.subscribe(state => {
          if (state.matches(ESceneState.current)) {
            // console.log("current", { state });
          }

          if (
            state.matches(ESceneState.change) &&
            !isEmpty(state.context.next)
          ) {
            this.scene.start(state.context.next);
            SceneEvents.send(ESceneEventType.CommitScene);
          }
        });
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

        if (isFunction(config.onClick)) {
          this.input.on("pointerdown", config.onClick, this);
        }

        if (isFunction(config.onUpdate)) {
          this.updateCallback = config.onUpdate;
        }
      }

      update(time: number): void {
        this.updateCallback(time);
      }
    };
    return this.instance;
  }
}

export default Scene;
