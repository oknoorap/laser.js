import { Instance as RootInstance } from ".";
import GameObjectInstance from "./object";

export interface ITextInstanceProps {
  text: string;
  id: string;
}

interface ITextInstance {
  getText(): string;
  setText(text: string);
  getId(): string;
  setId(id: string);
  getParentInstance(): GameObjectInstance;
  setParentInstance(object: GameObjectInstance);
}

class TextInstance implements ITextInstance {
  private rootInstance: RootInstance;
  private parentInstance: GameObjectInstance;
  private text: string = "";
  private id: string = "";

  constructor(rootInstance: RootInstance, { id, text }: ITextInstanceProps) {
    this.rootInstance = rootInstance;
    this.setText(text);
    this.setId(id);
  }

  getText() {
    return this.text;
  }

  setText(text: string) {
    this.text = text;
  }

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  setParentInstance(scene: GameObjectInstance) {
    this.parentInstance = scene;
  }

  getParentInstance(): GameObjectInstance {
    return this.parentInstance;
  }
}

export default TextInstance;
