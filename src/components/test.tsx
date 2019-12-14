import React, { FunctionComponent } from "react";

interface ITest {
  props1: boolean;
}

const Test: FunctionComponent<ITest> = () => {
  return <strong>test</strong>;
};

export default Test;
