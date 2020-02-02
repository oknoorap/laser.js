import { FC, forwardRef, RefForwardingComponent } from "react";
import { Types } from "phaser";

import createComponent, { IComponent } from "../utils/create-component";
import { EComponentType } from "../types/enum";
import IEvents, { ISceneEvents } from "../types/events";

interface IGame
  extends IComponent,
    IEvents,
    ISceneEvents,
    Types.Scenes.SettingsConfig {
  name: string;
}

const Scene: RefForwardingComponent<FC<IGame>, IGame> = forwardRef(
  ({ children, ...props }, ref) =>
    createComponent({
      ref,
      children,
      type: EComponentType.Scene,
      props
    })
);

export default Scene;
