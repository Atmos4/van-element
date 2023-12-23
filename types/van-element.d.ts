import { State, ChildDom } from "vanjs-core";

export type ElementProps = {
  attr: (name: string) => string;
  /** Registers a callback that is called when the element connects to the DOM */
  mount: (
    /** Callback when the element connects to the DOM
     * @returns An optional dismount callback
     */
    mount: () => (() => void) | void
  ) => void;
  /** Instance of the custom element */
  $this: HTMLElement;
};

/**
 * Defines a VanJS custom element.
 */
export declare const define: (
  /** Name of the custom element */
  name: string,
  /** VanJS functional component */
  element: (
    /** Attributes of the custom element */
    attributes: ElementProps
  ) => ChildDom,
  shadow?: boolean
) => void;
