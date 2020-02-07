import { EventTypes } from "../types/events";

export const mouseEventsMap = [
  [EventTypes.onDrag, "drag"],
  [EventTypes.onDragEnd, "dragend"],
  [EventTypes.onDragEnter, "dragenter"],
  [EventTypes.onDragLeave, "dragleave"],
  [EventTypes.onDragOver, "dragover"],
  [EventTypes.onDragStart, "dragstart"],
  [EventTypes.onDrop, "drop"],
  [EventTypes.onClick, "pointerdown"],
  [EventTypes.onMouseMove, "pointermove"],
  [EventTypes.onMouseOut, "pointerout"],
  [EventTypes.onMouseOver, "pointerover"],
  [EventTypes.onMouseRelease, "pointerup"],
  [EventTypes.onWheel, "wheel"]
];

export const keyboardEventsMap = [
  [EventTypes.onKeyDown, "keydown"],
  [EventTypes.onKeyUp, "keyup"],
  [EventTypes.onKeyCombo, "keycombomatch"],
  [EventTypes.onKeyPressed, "keydown-*", true],
  [EventTypes.onKeyReleased, "keyup-*", true]
];

export const gameObjectEventsMap = [...mouseEventsMap];

export const sceneMouseEventsMap = [
  ...mouseEventsMap,
  [EventTypes.onMouseReleaseOutside, "pointerupoutside"],
  [EventTypes.onClickOutside, "pointerdownoutside"],
  [EventTypes.onObjectClick, "gameobjectdown"],
  [EventTypes.onObjectRelease, "gameobjectup"],
  [EventTypes.onObjectWheel, "gameobjectwheel"],
  [EventTypes.onGameOut, "gameout"]
];

export const sceneCallbackMap = ["onUpdate", "onCreate", "onDestroy"];
