import typescript from "rollup-plugin-typescript3";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" }
    ],
    plugins: [typescript(), terser()],
    external: Object.keys(pkg.peerDependencies || {})
  }
];
