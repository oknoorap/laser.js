import * as Phaser from "phaser";
import isFunction from "lodash/isFunction";
import { updatedDiff } from "deep-object-diff";

import { Instance as RootInstance } from ".";
import GameObjectInstance, { IGameObjectInstanceProps } from "./object";
import TextInstance from "./text";
import { EComponentType } from "../../types/common";
import { sceneMouseEventsMap, sceneCallbackMap } from "../../utils/events";

interface IScene {
  setConfig(config: Phaser.Types.Scenes.SettingsConfig);
  getConfig(key?: string): Phaser.Types.Scenes.SettingsConfig;
  addObject(object: GameObjectInstance);
  getObjects(): GameObjectInstance[];
  getInstance();
  init();
}

interface ObjectsMap {
  [key: string]: {
    type: EComponentType;
    object: Phaser.GameObjects.GameObject;
  };
}

class SceneInstance implements IScene {
  private rootInstance: RootInstance;
  private instance;
  private config;

  constructor(
    rootInstance: RootInstance,
    config: Phaser.Types.Scenes.SettingsConfig = {}
  ) {
    this.rootInstance = rootInstance;
    this.setConfig(config);
  }

  getConfig(key?: string) {
    return key ? this.config[key] : this.config;
  }

  setConfig(config: Phaser.Types.Scenes.SettingsConfig) {
    this.config = config;
  }

  addObject(object: GameObjectInstance) {
    const objects = this.rootInstance.getObjectsInstance();
    const propsKeyId = "id";

    for (const obj of objects) {
      if (obj.getProps(propsKeyId) === object.getProps(propsKeyId)) {
        obj.setParentInstance(this);
      }
    }
  }

  getObjects(): GameObjectInstance[] {
    const rootObjects = this.rootInstance.getObjectsInstance();
    const objects = rootObjects.filter(
      item =>
        (item.getParentInstance() as SceneInstance).getConfig("id") ===
        this.config.id
    );

    return objects;
  }

  getInstance() {
    return this.instance;
  }

  init() {
    const config = this.config;
    const gameObjects = this.getObjects();

    class Scene extends Phaser.Scene {
      objectsMap: ObjectsMap = {};

      onCreate: () => void = () => null;
      onUpdate: (elapsed: number, delta: number) => void = () => null;
      onDestroy: () => void = () => null;

      constructor() {
        super(config);

        for (const callback of sceneCallbackMap) {
          if (isFunction(config[callback])) {
            this[callback] = config.onUpdate;
          }
        }
      }

      updateObjects() {
        for (const gameObject of gameObjects) {
          const { type, id } = gameObject.getProps();

          const object = this.objectsMap[id].object;
          if (!object) {
            return;
          }

          switch (type) {
            case EComponentType.Text:
              const textObject = object as Phaser.GameObjects.Text;
              const oldProps = gameObject.getTextOldProps(textObject);
              const newProps = gameObject.getTextNewProps();
              gameObject.updateTextProps(textObject, oldProps, newProps);
              break;
          }
        }
      }

      create(): void {
        for (const gameObject of gameObjects) {
          const { type, id, ...props } = gameObject.getProps();
          let object;

          switch (type) {
            case EComponentType.Text:
              const { x, y, style } = props;
              const text = gameObject.textNodesToString();
              object = this.add.text(x, y, text, style);
              break;
          }

          if (object) {
            this.objectsMap[id] = {
              type,
              object
            };
          }
        }

        for (const [eventName, originalEventName] of sceneMouseEventsMap) {
          if (isFunction(config[eventName])) {
            this.input.on(
              originalEventName,
              (...params) => {
                config[eventName]({
                  scene: this.scene,
                  ...params
                });
              },
              this
            );
          }
        }
      }

      update(elapsed: number, delta: number): void {
        this.onUpdate(elapsed, delta);
        this.updateObjects();
      }
    }

    this.instance = Scene;
  }
}

export default SceneInstance;
