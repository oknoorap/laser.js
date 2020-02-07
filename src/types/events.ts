import * as Phaser from "phaser";

export enum EventTypes {
  onDrag = "onDrag",
  onDragEnd = "onDragEnd",
  onDragEnter = "onDragEnter",
  onDragLeave = "onDragLeave",
  onDragOver = "onDragOver",
  onDragStart = "onDragStart",
  onDrop = "onDrop",
  onClick = "onClick",
  onMouseMove = "onMouseMove",
  onMouseOut = "onMouseOut",
  onMouseOver = "onMouseOver",
  onMouseRelease = "onMouseRelease",
  onWheel = "onWheel",
  onKeyDown = "onKeyDown",
  onKeyUp = "onKeyUp",
  onKeyCombo = "onKeyCombo",
  onKeyPressed = "onKeyPressed",
  onKeyReleased = "onKeyReleased",
  onMouseReleaseOutside = "onMouseReleaseOutside",
  onClickOutside = "onClickOutside",
  onObjectClick = "onObjectClick",
  onObjectRelease = "onObjectRelease",
  onObjectWheel = "onObjectWheel",
  onGameOut = "onGameOut"
}

interface IVector2D {
  x: number;
  y: number;
}

interface IVector3D extends IVector2D {
  z: number;
}

interface IMousePositionEvent {
  position: IVector2D;
}

export type SceneEvent<T extends {}> = T & {
  scene: Phaser.Scenes.ScenePlugin;
};

export interface IMousePointerEvent {
  pointer: Phaser.Input.Pointer;
}

export interface IMouseEventTarget {
  target: Phaser.GameObjects.GameObject;
}

export interface IMouseEventObject {
  object: Phaser.GameObjects.GameObject;
}

export interface IMouseDragEvent
  extends IMousePointerEvent,
    IMouseEventObject,
    IMousePositionEvent {}
export interface IMousePointerObjectEvent
  extends IMousePointerEvent,
    IMouseEventObject {}

export interface IMouseTargetEvent
  extends IMousePointerEvent,
    IMouseEventObject,
    IMouseEventTarget {}

export interface IMousePointerObjectsEvent extends IMousePointerEvent {
  objects: Phaser.GameObjects.GameObject[];
}

interface IMouseWheelEvent extends IMousePointerObjectsEvent {
  scroll: IVector3D;
}

interface IMouseGameObjectEvent extends IMousePointerEvent, IMouseEventObject {
  event: Phaser.Types.Input.EventData;
}

interface IMouseGameObjectEvent extends IMousePointerObjectsEvent {
  event: Phaser.Types.Input.EventData;
}

interface IGameOutEvent {
  time: number;
  event: MouseEvent | TouchEvent;
}

interface IKeyboardEvent {
  event: KeyboardEvent;
}

interface IMouseKeyboardComboEvent extends IKeyboardEvent {
  combo: Phaser.Input.Keyboard.KeyCombo;
}

export interface ISceneEvents {
  onUpdate?: (elapsed: number, delta: number) => void;
  onDrag?: (params: SceneEvent<IMouseDragEvent>) => void;
  onDragEnd?: (params: SceneEvent<IMousePointerObjectEvent>) => void;
  onDragEnter?: (params: SceneEvent<IMouseTargetEvent>) => void;
  onDragLeave?: (params: SceneEvent<IMouseTargetEvent>) => void;
  onDragOver?: (params: SceneEvent<IMouseTargetEvent>) => void;
  onDragStart?: (params: SceneEvent<IMousePointerObjectEvent>) => void;
  onDrop?: (params: SceneEvent<IMouseTargetEvent>) => void;
  onClick?: (params: SceneEvent<IMousePointerObjectsEvent>) => void;
  onMouseMove?: (params: SceneEvent<IMousePointerObjectsEvent>) => void;
  onMouseOut?: (params: SceneEvent<IMousePointerObjectsEvent>) => void;
  onMouseOver?: (params: SceneEvent<IMousePointerObjectsEvent>) => void;
  onMouseRelease?: (params: SceneEvent<IMousePointerObjectsEvent>) => void;
  onWheel?: (params: SceneEvent<IMouseWheelEvent>) => void;
  onMouseReleaseOutside?: (params: SceneEvent<IMousePointerEvent>) => void;
  onClickOutside?: (params: SceneEvent<IMousePointerEvent>) => void;
  onObjectClick?: (params: SceneEvent<IMouseGameObjectEvent>) => void;
  onObjectRelease?: (params: SceneEvent<IMouseGameObjectEvent>) => void;
  onObjectWheel?: (params: SceneEvent<IMouseGameObjectEvent>) => void;
  onGameOut?: (params: SceneEvent<IGameOutEvent>) => void;
  onKeyDown?: (params: SceneEvent<IKeyboardEvent>) => void;
  onKeyUp?: (params: SceneEvent<IKeyboardEvent>) => void;
  onKeyCombo?: (params: SceneEvent<IMouseKeyboardComboEvent>) => void;
  onKeyPressed?: (params: SceneEvent<IKeyboardEvent>) => void;
  onKeyReleased?: (params: SceneEvent<IKeyboardEvent>) => void;
}
