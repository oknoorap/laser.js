import { getPropsAttr } from "../../utils/helpers";

const prepareUpdate = (instance, type, oldProps, newProps) => {
  return getPropsAttr(newProps);
};

export default prepareUpdate;
