import React, { ReactNode, useRef, Ref, useImperativeHandle } from "react";
import { EComponentType } from "./common-typings";

interface IGameData {
  type: EComponentType;
  props: any;
}

interface IComponent {
  type: EComponentType;
  children: ReactNode;
  ref: Ref<IGameData>;
  props: any;
}

const createComponent = ({ type, props, ref, children }: IComponent) => {
  const scriptRef = useRef();
  useImperativeHandle(ref, () => ({
    type,
    props
  }));

  return (
    <script
      data-type={type}
      data-props={props}
      children={children}
      ref={scriptRef}
    />
  );
};

export default createComponent;
