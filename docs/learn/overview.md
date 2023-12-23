# Overview

The core `define` method can take up to 3 arguments:

- `name` - custom element tag.
- `element` - VanJS functional component.
- `shadow` : `boolean` (_optional, `true` by default_)  
  Whether or not the custom element uses Shadow DOM.

The provided VanJS method will be injected an objected containing 3 properties:

- `attr` - method that can retrieve attributes.
- `mount` - lifecycle hook to register connected and disconnect callbacks.
- `$this` - refers to the instance of the custom element.
