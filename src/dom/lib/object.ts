interface IGameObjectObjectProps {
  [key: string]: any;
}

interface IGameObjectObject {
  props: IGameObjectObjectProps;
}

class GameObject implements IGameObjectObject {
  props: IGameObjectObjectProps = {};

  constructor(props?: IGameObjectObjectProps) {
    this.setProps(props);
  }

  setProps(props: IGameObjectObjectProps) {
    this.props = {
      ...this.props,
      ...props
    };
  }
}

export default GameObject;
