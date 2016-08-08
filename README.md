## What

```js
//   __                                          _
//  / _|         make frontend great again      | |
// | |_ _   _ _ __  _ __   ___  _ __   ___ _ __ | |_
// |  _| | | | '_ \| '_ \ / _ \| '_ \ / _ \ '_ \| __|
// | | | |_| | | | | |_) | (_) | | | |  __/ | | | |_
// |_|  \__,_|_| |_| .__/ \___/|_| |_|\___|_| |_|\__|
//                 | |
// FUNPONENT       |_|             CONCEPT / TUTORIAL

/* @jsx funponent */
import funponent from 'funponent';

// Progressively enhance these DOM elements
// In realtime. Loading component mount points via AJAX? No problem.
const selector = '[data-component=hello]';

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
// React equivalent: componentDidMount
const init = element => {
  element.dataset.hash = location.hash;
};

// Destroy function, called before deleting component
// React equivalent: componentWillUnmount
const destroy = element => {
  // some cleanup code here, perhaps `clearInterval`
};

// Bind all together (events, init and destroy are optional)
funponent({selector, component, events, init, destroy});
```

### Initial state

```html
<div data-component="hello" data-current-name="world">
  <!-- maybe some initial server output.
       will be diffed against. -->
</div>
<div data-component="hello" data-current-name="another instance">
</div>
```

### After funponent

```html
<div data-component="hello" data-current-name="world">
  <p>
    Hello world
  </p>
  <p>
    <input value="world" />
  </p>
  <p>
     <a href="#some-hash-triggered-by-init">
       Click to change #hash
     </a>
  </p>
</div>
<div data-component="hello" data-current-name="another instance">
  <p>
    Hello another instance
  </p>
  <p>
    <input value="another instance" />
  </p>
  <p>
     <a href="#some-hash-triggered-by-init">
       Click to change #hash
     </a>
  </p>
</div>
```

## Notes

* Whenever user types anything ('input' event), `data-current-name` is reflected

* Transition between states performed by [morphdom](https://github.com/patrick-steele-idem/morphdom)

* DOM is the single source of truth. More specifically: components' `data-*` attributes

* Nesting funponents is seamless, a component can render mount points for other components

* MutationObserver is used to detect state changes

* Browser developer tools can be used to inspect current state at any time
