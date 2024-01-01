# Overview

The core `define` method can take up to 3 arguments:

- `name`  
  Custom element tag.
- `element`  
  VanJS functional component.
- `shadow` : `boolean` (_optional, `true` by default_)  
  Whether or not the custom element uses Shadow DOM.

The provided VanJS method will be provided with 3 properties:

- `attr()`  
  Method to [retrieve the value of a given attribute](./attributes).
- `mount()`  
  Lifecycle hook to [register `mount` and `dismount` callbacks](./lifecycle).
- `$this`  
  Refers to the instance of the Van Element.
