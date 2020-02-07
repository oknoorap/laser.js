import * as Phaser from "phaser";
import isFunction from "lodash/isFunction";
import eol from "eol";

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
    const objects = this.rootInstance.getObjectsInstance();
    const sceneObjects = objects.filter(
      item =>
        (item.getParentInstance() as SceneInstance).getConfig("id") ===
        this.config.id
    );

    return sceneObjects;
  }

  getInstance() {
    return this.instance;
  }

  init() {
    const config = this.config;
    const sceneObjects = this.getObjects();

    class Scene extends Phaser.Scene {
      objectsMap: ObjectsMap = {};

      onCreate: () => void = () => null;
      onUpdate: (time?: number) => void = () => null;
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
        // for (const id in this.objectsMap) {
        //   const { type, object } = this.objectsMap[id];
        //   switch (type) {
        //     case EComponentType.Text:
        //       console.log({ object });
        //       break;
        //   }
        // }
      }

      create(): void {
        for (const object of sceneObjects) {
          const { type, id, ...props } = object.getProps();
          switch (type) {
            case EComponentType.Text:
              const { x, y, style } = props;
              const textNodes: string[] = props.text
                .map((textNode: TextInstance) => eol.split(textNode.getText()))
                .join("");
              const object = this.add.text(x, y, textNodes, style);
              this.objectsMap[id] = {
                type,
                object
              };
              break;
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

      update(time: number): void {
        this.onUpdate(time);
        this.updateObjects();
      }
    }

    this.instance = Scene;
  }
}

export default SceneInstance;
