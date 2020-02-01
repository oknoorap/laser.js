import React, {
  FC,
  forwardRef,
  useImperativeHandle,
  Component,
  RefForwardingComponent,
  Ref,
  useRef
} from "react";
import { Types } from "phaser";

import createComponent from "../utils/create-component";
import { EComponentType } from "../utils/common-typings";

interface IGameData {
  type: EComponentType;
  props: any;
}

interface IGame extends Types.Core.GameConfig {
  ref: Ref<IGameData>;
}

const Game: RefForwardingComponent<FC<IGame>, IGame> = forwardRef(
  ({ children, ...props }, ref) =>
    createComponent({
      ref,
      children,
      type: EComponentType.Game,
      props: {
        banner: {
          hidePhaser: false
        },
        ...props
      }
    })
);

export default Game;
