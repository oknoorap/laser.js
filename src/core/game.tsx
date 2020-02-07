import { FC, forwardRef, RefForwardingComponent } from "react";
import { Types } from "phaser";

import createComponent, { IComponent } from "../utils/create-component";
import { EComponentType } from "../types/common";

interface IGame extends IComponent, Types.Core.GameConfig {}

const Game: RefForwardingComponent<FC<IGame>, IGame> = forwardRef(
  ({ children, ...props }, ref) =>
    createComponent({
      ref,
      children,
      type: EComponentType.Game,
      props
    })
);

export default Game;
