export interface ISceneEvents {
  onUpdate?: (time: number) => void;
}

export default interface IEvents {
  onClick?: () => void;
}
