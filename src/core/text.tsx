import { FC, forwardRef, RefForwardingComponent } from "react";
import { Types } from "phaser";

import createComponent, { IComponent } from "../utils/create-component";
import { EComponentType } from "../types/common";

interface IGame extends IComponent {
  x?: number;
  y?: number;
  style?: Types.GameObjects.Text.TextStyle;
}

const Text: RefForwardingComponent<FC<IGame>, IGame> = forwardRef(
  ({ children, x = 0, y = 0, ...props }, ref) =>
    createComponent({
      ref,
      children,
      type: EComponentType.Text,
      props: {
        x,
        y,
        ...props
      }
    })
);

export default Text;
