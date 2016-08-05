import morphdom from 'morphdom';
import 'matches-selector-polyfill';

// observe document for dynamically added components
const selectors = {};
(new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    [].slice.call(mutation.addedNodes || [])
      .filter(node => node.nodeType === 1)
      .forEach(node => {
        Object.keys(selectors)
          .filter(selector => node.matches(selector))
          .forEach(selector => selectors[selector](node));
      });
  });
})).observe(document, {
  childList: true,
  subtree: true
});

// convenient wrapper around querySelectorAll, jQuery style
const $ = selector => [].slice.call(document.querySelectorAll(selector));

// DOM builder, JSX style
const h = (nodeName, attributes, ...children) => {
  const node = document.createElement(nodeName);
  Object.keys(attributes || {}).forEach(name => {
    node.setAttribute(name, attributes[name]);
  });
  children.forEach(child => {
    if (Array.isArray(child)) {
      const fragment = document.createDocumentFragment();
      child.forEach(subchild => fragment.appendChild(subchild));
      node.appendChild(fragment);
    } else if (typeof (child || '') === 'string') {
      node.appendChild(document.createTextNode(child || ''));
    } else {
      node.appendChild(child);
    }
  });
  return node;
};

// bind a selector to a view function
const bind = (selector, view) => {
  const render = node => {
    morphdom(node, view(node.dataset), {childrenOnly: true})
  };
  const init = node => {
    (new MutationObserver(mutations => {
      const dirty = mutations.filter(mut => mut.attributeName ?
        mut.attributeName.startsWith('data-') : Boolean(mut.removedNodes.length)
      );
      if (dirty.length) {
        render(node);
      }
    })).observe(node, {
      attributes: true,
      childList: true,
    });
    render(node);
  };
  $(selector).forEach(init);
  selectors[selector] = selectors[selector] || init;
};

export {h, bind};
