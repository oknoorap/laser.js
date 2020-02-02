import React, { ReactNode, Ref, useRef, useImperativeHandle } from "react";
import { EComponentType } from "../types/enum";

export interface IComponentData {
  type: EComponentType;
  props: any;
}

export interface IComponent {
  ref?: Ref<IComponentData>;
}

interface IComponentOpts {
  type: EComponentType;
  children?: ReactNode;
  ref: Ref<IComponentData>;
  props: any;
}

const createComponent = ({ type, props, ref, children }: IComponentOpts) => {
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
