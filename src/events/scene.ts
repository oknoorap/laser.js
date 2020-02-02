import { createMachine, assign, interpret } from "@xstate/fsm";

export enum ESceneEventType {
  ChangeScene = "change-scene",
  SetCurrentScene = "set-current-scene",
  CommitScene = "commit-scene"
}

export enum ESceneState {
  current = "current",
  change = "change"
}

interface ISceneContext {
  previous: string;
  current: string;
  next: string;
}

type SceneEvent =
  | {
      type: ESceneEventType.ChangeScene;
      scene: string;
    }
  | {
      type: ESceneEventType.SetCurrentScene;
      scene: string;
    }
  | {
      type: ESceneEventType.CommitScene;
      scene: string;
    };

type SceneState =
  | {
      value: ESceneState.current;
      context: ISceneContext;
    }
  | {
      value: ESceneState.change;
      context: ISceneContext;
    };

const sceneMachine = createMachine<ISceneContext, SceneEvent, SceneState>({
  id: "scene",
  initial: ESceneState.current,
  context: {
    previous: "",
    current: "",
    next: ""
  },
  states: {
    [ESceneState.current]: {
      on: {
        [ESceneEventType.SetCurrentScene]: {
          actions: assign({
            current: (_, e) => e.scene
          })
        },
        [ESceneEventType.ChangeScene]: {
          target: ESceneState.change,
          actions: assign({
            next: (_, e) => e.scene
          })
        }
      }
    },
    [ESceneState.change]: {
      on: {
        [ESceneEventType.CommitScene]: {
          target: ESceneState.current,
          actions: assign({
            previous: ctx => ctx.current,
            current: ctx => ctx.next,
            next: ""
          })
        }
      }
    }
  }
});

const sceneEvent = interpret(sceneMachine);

export default sceneEvent;
