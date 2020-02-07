import GameInstance from "./game";
import SceneInstance from "./scene";
import GameObjectInstance, { IGameObjectInstanceProps } from "./object";
import TextInstance from "./text";

interface IInstance {
  getGameInstance(): GameInstance;
  getScenesInstance(): SceneInstance[];
  getObjectsInstance(): GameObjectInstance[];
  getTextInstance(): TextInstance[];
  createGameInstance(config: Phaser.Types.Core.GameConfig): GameInstance;
  createSceneInstance(
    config: Phaser.Types.Scenes.SettingsConfig
  ): SceneInstance;
  createObjectInstance(props: IGameObjectInstanceProps): GameObjectInstance;
  createTextInstance(text: string): TextInstance;
}

export class Instance implements IInstance {
  private game: GameInstance;
  private scenes: SceneInstance[] = [];
  private objects: GameObjectInstance[] = [];
  private text: TextInstance[] = [];

  getGameInstance() {
    return this.game;
  }

  createGameInstance(config) {
    this.game = new GameInstance(this, config);
    return this.game;
  }

  getScenesInstance() {
    return this.scenes;
  }

  createSceneInstance(config) {
    const instance = new SceneInstance(this, config);
    this.scenes.push(instance);
    return instance;
  }

  getObjectsInstance() {
    return this.objects;
  }

  createObjectInstance(props) {
    const instance = new GameObjectInstance(this, props);
    this.objects.push(instance);
    return instance;
  }

  getTextInstance() {
    return this.text;
  }

  createTextInstance(props) {
    const instance = new TextInstance(this, props);
    this.text.push(instance);
    return instance;
  }
}

export default new Instance();
