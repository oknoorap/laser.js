import instance from "../instance";

import { EComponentType } from "../../types/common";
import { getPropsAttr, getTypeAttr, generateId } from "../../utils/helpers";

const createInstance = (_, componentProps: any) => {
  const type = getTypeAttr(componentProps);
  const props = getPropsAttr(componentProps);
  const defaultProps = {
    id: generateId(type),
    ...props
  };

  switch (type) {
    case EComponentType.Game:
      return instance.createGameInstance({
        ...defaultProps
      });
      break;

    case EComponentType.Scene:
      return instance.createSceneInstance({
        key: defaultProps.name,
        ...defaultProps
      });

    case EComponentType.Text:
      return instance.createObjectInstance({
        type,
        ...defaultProps
      });

    default:
      return;
  }
};

export default createInstance;
