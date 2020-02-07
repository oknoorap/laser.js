import ReactReconciler from "react-reconciler";
import { updatedDiff } from "deep-object-diff";

import createInstance from "./create-instance";
import createTextInstance from "./create-text-instance";
import appendChildToContainer from "./append-child-to-container";
import appendInitialChild from "./append-initial-child";
import prepareUpdate from "./prepare-update";
import commitMount from "./commit-mount";
import commitUpdate from "./commit-update";
import commitTextUpdate from "./commit-text-update";

const reconciler = ReactReconciler({
  // Settings
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: true,
  supportsHydration: true,

  // Create Instance
  createInstance,
  createTextInstance,

  appendChildToContainer,
  appendChild(parent: any, child) {
    console.log("hello", { parent, child });
    // parent.appendChild(child);
  },
  appendInitialChild,

  // props
  prepareUpdate,
  commitMount,
  commitUpdate,
  commitTextUpdate,
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

export default reconciler;
