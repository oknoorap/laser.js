import { ReactElement } from "react";
import ReactReconciler, { Fiber } from "react-reconciler";
import * as Phaser from "phaser";

import { EComponentType } from "../utils/common-typings";
import { getPropsAttr, getTypeAttr, generateId } from "../utils/helpers";

const reconciler = ReactReconciler({
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: true,
  supportsHydration: true,

  createInstance(_: string, $props: any) {
    const type = getTypeAttr($props);
    const props = getPropsAttr($props);

    switch (type) {
      case EComponentType.Game:
        props.id = generateId("game");
        return class extends Phaser.Game {
          constructor(parent) {
            props.parent = parent;
            super(props);
          }
        };
    }
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle: Fiber
  ) {
    // return new C(text);
    // console.log({ text });
    // return document.createTextNode(text);
  },

  // Appender
  appendChildToContainer(container: any, GameClass: any) {
    if (!GameClass) {
      console.warn("The first child of game should be `<Game />` component.");
    }

    new GameClass(container);
    // console.log("appendChildToContainer", { container, child });
    // container.appendChild(document.createTextNode(JSON.stringify(child)));
  },
  appendChild(parent: any, child) {
    console.log("hello", { parent, child });
    // parent.appendChild(child);
  },
  appendInitialChild(parent: any, child) {
    console.log("appendInitialChild", { parent, child });
    // if (parent instanceof A && child instanceof B) {
    //   parent.add(child);
    // }
    // if (parent instanceof B) {
    //   switch (true) {
    //     case child instanceof C:
    //       parent.setText(`${parent.text}${(child as C).text}`);
    //       break;
    //   }
    // }
  },

  // props
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainer,
    hostContext
  ) {},
  commitMount() {},
  commitUpdate(instance, payload, type, oldProps, newProps, finishedWork) {},
  prepareForCommit(containerInfo) {},
  resetAfterCommit(containerInfo) {},

  // Misc
  finalizeInitialChildren: (parent, type, props, rootContainer, hostContext) =>
    true,
  getChildHostContext(parentHostContext, type, rootContainer) {},
  getPublicInstance(instance) {},
  getRootHostContext(rootContainer) {},
  shouldSetTextContent: () => false,
  shouldDeprioritizeSubtree: (type, props) => true,
  scheduleDeferredCallback(callback: Function) {},
  cancelDeferredCallback(id) {},

  // Time
  setTimeout(handler: (...args: any[]) => void, timeout: number) {},
  clearTimeout(handler: any) {},
  noTimeout() {},
  now: Date.now
});

const render = (
  reactElement: ReactElement,
  domElement,
  callback?: () => void
) => {
  if (!domElement) {
    domElement = document.createElement("div");
  }

  const container = reconciler.createContainer(domElement, false, false);
  reconciler.updateContainer(reactElement, container, null, callback);
};

export default render;
