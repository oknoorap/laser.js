import cx from "classnames";
import * as Phaser from "phaser";
import React, {
  forwardRef,
  ReactNode,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  createRef,
  createElement,
  cloneElement,
  ReactElement
} from "react";

import useId from "./hooks/use-id";
import { getValidChilds } from "./utils/components";
import Scene from "./scene";

interface IGameProps {
  full?: boolean;
  stretch?: boolean;
  config?: Phaser.Types.Core.GameConfig;
  className?: any;
  children?: ReactNode;
}

let game: Phaser.Game;

const stretchStyles = {
  width: "100%",
  height: "100%"
};

const fullWidthStyles = {
  ...stretchStyles,
  position: "fixed",
  top: 0,
  left: 0
};

const defaultConfig: Phaser.Types.Core.GameConfig = {
  banner: {
    hidePhaser: false
  }
};

const Game: RefForwardingComponent<Phaser.Game, IGameProps> = (
  { stretch, full, config, className = "laser-game", children },
  ref
) => {
  const id = useId();
  const scenes = getValidChilds(children, Scene);
  const scenesRefs = useRef([...Array(scenes.length)].map(() => createRef()));
  const parent = useRef(null);
  let styles = {};

  if (stretch || full) {
    styles = {
      ...stretchStyles
    };
  }

  if (full) {
    styles = {
      ...fullWidthStyles
    };
  }

  useLayoutEffect(() => {
    if (stretch || full) {
      const { width, height } = parent.current.getBoundingClientRect();
      config.width = width;
      config.height = height;
    }

    const scene = scenesRefs.current.map(item => item.current && item.current);

    game = new Phaser.Game({
      scene,
      parent: parent.current,
      ...defaultConfig,
      ...config
    });
  }, []);

  useImperativeHandle(ref, () => game);

  return (
    <div id={id} ref={parent} style={styles} className={cx(className)}>
      {scenes.map((item, index) => {
        const scene = item as ReactElement;
        return cloneElement(scene, {
          ...scene.props,
          ref: scenesRefs.current[index]
        });
      })}
    </div>
  );
};

export default forwardRef(Game);
