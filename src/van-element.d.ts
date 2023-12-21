import { State, ChildDom } from "vanjs-core";

export declare const define: (
  name: string,
  element: (
    props: Record<string, State<string>> & {
      onMount: (mountFunction: (element: HTMLElement) => void) => void;
      element: HTMLElement;
    }
  ) => ChildDom,
  options?: { observed?: string[]; disableShadow?: boolean }
) => void;
