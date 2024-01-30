# Overview

The core `define` method can take up to 3 arguments:

- `name`  
  Custom element tag.
- `element`  
  VanJS functional component.
- `options` (_optional_)  
  Extra [Shadow DOM options](./shadow-options).

The provided VanJS method will be provided with 4 properties:

- `attr()`  
  Method to [retrieve the value of a given attribute](./attributes).
- `mount()`  
  Lifecycle hook to [register `mount` and `dismount` callbacks](./lifecycle).
- `$this`  
  Refers to the instance of the Van Element.
- `children`
  Child nodes of the custom element.
