import { Instance as RootInstance } from ".";
import SceneInstance from "./scene";
import TextInstance from "./text";

export interface IGameObjectInstanceProps {
  [key: string]: any;
}

interface IGameObjectInstance {
  getProps(key?: string): IGameObjectInstanceProps;
  setProps(props: IGameObjectInstanceProps);
  getParentInstance(): SceneInstance | GameObjectInstance;
  setParentInstance(scene: SceneInstance | GameObjectInstance);
  addChild(
    object: GameObjectInstance | TextInstance,
    props: IGameObjectInstanceProps
  );
}

class GameObjectInstance implements IGameObjectInstance {
  private rootInstance: RootInstance;
  private parentInstance: SceneInstance | GameObjectInstance;
  private props: IGameObjectInstanceProps = {};

  constructor(rootInstance: RootInstance, props?: IGameObjectInstanceProps) {
    this.rootInstance = rootInstance;
    this.setProps(props);
  }

  getProps(key?: string) {
    return key ? this.props[key] : this.props;
  }

  setProps(props: IGameObjectInstanceProps) {
    this.props = {
      ...this.props,
      ...props
    };
  }

  addChild(
    object: GameObjectInstance | TextInstance,
    props: IGameObjectInstanceProps
  ) {
    object.setParentInstance(this);
    this.setProps(props);
  }

  setParentInstance(scene: SceneInstance | GameObjectInstance) {
    this.parentInstance = scene;
  }

  getParentInstance(): SceneInstance | GameObjectInstance {
    return this.parentInstance;
  }
}

export default GameObjectInstance;
