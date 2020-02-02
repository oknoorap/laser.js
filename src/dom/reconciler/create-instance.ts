import GameManager from "../managers/game";
import SceneManager from "../managers/scene";
import ObjectManager from "../managers/object";

import { EComponentType } from "../../types/enum";
import { getPropsAttr, getTypeAttr, generateId } from "../../utils/helpers";

const createInstance = (_: string, $props: any) => {
  const type = getTypeAttr($props);
  const props = getPropsAttr($props);
  let instance;
  let defaultProps = {
    id: generateId(type),
    ...props
  };

  switch (type) {
    case EComponentType.Game:
      instance = new GameManager({
        ...defaultProps
      });
      break;

    case EComponentType.Scene:
      instance = new SceneManager({
        key: defaultProps.name,
        ...defaultProps
      });
      break;

    case EComponentType.Text:
      instance = new ObjectManager({
        type,
        ...defaultProps
      });

    default:
      break;
  }

  return instance;
};

export default createInstance;
