# funponent
JS fatigue much? Make front-end fun again.

```js
//   __                                          _
//  / _|         make frontend fun again        | |
// | |_ _   _ _ __  _ __   ___  _ __   ___ _ __ | |_
// |  _| | | | '_ \| '_ \ / _ \| '_ \ / _ \ '_ \| __|
// | | | |_| | | | | |_) | (_) | | | |  __/ | | | |_
// |_|  \__,_|_| |_| .__/ \___/|_| |_|\___|_| |_|\__|
//                 | |
// FUNPONENT       |_|             CONCEPT / TUTORIAL

// React is just a shim for Babel JSX to work with default settings
import {React, funponent} from 'funponent';

// Progressively enhance these DOM elements
// In realtime. Loading component mount points via AJAX? No problem.
const selector = '.funponent-hello';

// The component function. Must be pure, receives (data-* attributes) params
// See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
const component = dataset => (
  <div>
    <p>
      Hello {dataset.currentName}
    </p>
    <p>
      Change name: <input value={dataset.currentName} />
    </p>
    <p>
      {dataset.hash ? (
        <code>
          location.hash = {dataset.hash}
        </code>
      ) : (
        <a href={'#put-some-hash-in-this-url'}>
          Click to change #hash
        </a>
      )}
    </p>
  </div>
);

// Event map of selector maps, handled by component root element
const events = {
  'input': {
    // Event delegation, a CSS selector within root
    'input[value]': (event, element) => {
      element.dataset.currentName = event.target.value;
    },
  },
};

// Init function. Can supply params via `dataset` (also async)
const init = element => {
  element.dataset.hash = location.hash;
};

// Bind all together (events and init are optional)
funponent({selector, component, events, init});

// Initial state:
//
// <div class="funponent-hello" data-current-name="world">
//   <!-- maybe some initial server output.
//        will be diffed against. -->
// </div>
// <div class="funponent-hello" data-current-name="another instance">
// </div>
//
// After funponent:
//
// <div class="funponent-hello" data-current-name="world">
//   <p>
//     Hello world
//   </p>
//   <p>
//     <input value="world" />
//   </p>
//   <p>
//      <a href="#some-hash-triggered-by-init">
//        Click to change #hash
//      </a>
//   </p>
// </div>
// <div class="funponent-hello" data-current-name="another instance">
//   <p>
//     Hello another instance
//   </p>
//   <p>
//     <input value="another instance" />
//   </p>
//   <p>
//      <a href="#some-hash-triggered-by-init">
//        Click to change #hash
//      </a>
//   </p>
// </div>
//
//
// Whenever user types anything ('input' event), `data-current-name` is reflected
//
// Transition between states performed by morph-dom
//
//
// DOM is the single source of truth.
// More specifically: components' data-* attributes
//
// Nesting funponents is seamless

```
