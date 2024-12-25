# Overview

`Van Element` exposes a single function: `define(...)`. It can take up to 3 arguments:

- `name`  
  Custom element tag.
- `element`  
  VanJS functional component.
- `options` (_optional_)  
  Extra [Shadow DOM options](./shadow-options).

The provided VanJS functional component will be called with an object containing the following properties:

- `attr()`  
  Method to [retrieve the value of a given attribute](./attributes).
- `mount()`  
  Lifecycle hook to [register `mount` and `dismount` callbacks](./lifecycle).
- `$this`  
  Refers to the instance of the created custom element. Useful for accessing properties or binding event listeners.
