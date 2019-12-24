import * as Phaser from "phaser";
import {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useLayoutEffect,
  ReactNode
} from "react";
import useID from "./hooks/use-id";

interface ISceneProps {
  name?: string;
  children?: ReactNode;
  onCreate?: (args: Phaser.Scene) => void;
}

let scene;

const Scene: RefForwardingComponent<{}, ISceneProps> = (
  { name, onCreate = () => {} },
  ref
) => {
  const key = name || useID("scene");

  useLayoutEffect(() => {
    scene = class GameScene extends Phaser.Scene {
      constructor() {
        super({ key });
      }

      preload() {
        // on
      }

      create() {
        onCreate.call(this, this);
      }
    };
  }, []);

  useImperativeHandle(ref, () => scene);

  return null;
};

export default forwardRef(Scene);
