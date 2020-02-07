import eol from "eol";
import { updatedDiff } from "deep-object-diff";
import isEmpty from "lodash/isEmpty";
import pascalcase from "pascalcase";

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

  // Update props if there is any changes
  updateTextProps(object, oldProps, newProps) {
    const diff = updatedDiff(oldProps, newProps);
    if (isEmpty(diff)) {
      return;
    }

    for (const key in diff) {
      const newValue = diff[key];
      object[`set${pascalcase(key)}`](newValue);
    }
  }

  // These methods below helper for text object.
  // It will help us to easy transform or get some props.
  textNodesToString(): string {
    if (!this.props.text) {
      return "";
    }

    // `this.add.text` support multiple text nodes
    const splitText = (textNode: TextInstance) => eol.split(textNode.getText());
    const text = this.props.text.map(splitText).join("");
    return text;
  }

  getTextOldProps(textObject: Phaser.GameObjects.Text) {
    const { x, y, text, style } = textObject;
    return { x, y, text, style };
  }

  getTextNewProps() {
    const { x, y, style } = this.props;
    const text = this.textNodesToString();
    return { x, y, text, style };
  }
}

export default GameObjectInstance;
