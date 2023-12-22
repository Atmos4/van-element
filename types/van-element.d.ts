import { State, ChildDom } from "vanjs-core";

export type ElementProps = Record<string, State<any>> & {
  onMount: (mountFunction: () => (() => void) | void) => void;
  element: HTMLElement;
};

export declare const define: (
  name: string,
  element: (props: ElementProps) => ChildDom,
  options?: { observed?: string[]; disableShadow?: boolean }
) => void;
