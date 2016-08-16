import morphdom from 'morphdom';
import 'matches-selector-polyfill';

const selectors = {};

// Observe document for dynamically added components
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

// DOM builder, JSX style
const svgns = 'http://www.w3.org/2000/svg';
const specialAttrs = {
  className: 'class',
  htmlFor: 'for',
};
const svgTags = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern',
];
const h = (nodeName, attributes, ...children) => {
  const node = (svgTags.indexOf(nodeName) > -1) ?
    document.createElementNS(svgns, nodeName) :
    document.createElement(nodeName);
  const setAttribute = attr => {
    node.setAttribute(specialAttrs[attr] || attr, attributes[attr]);
  };
  Object.keys(attributes || {}).forEach(setAttribute);
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

// proxy h as React.createElement
const React = {createElement: (...args) => h(...args)};

// bind a selector to a view function
const bind = (selector, view, options={}) => {
  const render = node => {
    morphdom(node, view(node.dataset), {...options, childrenOnly: true})
  };
  const init = node => {
    (new MutationObserver(mutations => {
      const dirty = mutations.some(mut => mut.attributeName ?
        mut.attributeName.startsWith('data-') : Boolean(mut.removedNodes.length)
      );
      if (dirty) {
        render(node);
      }
    })).observe(node, {
      attributes: true,
      childList: true,
    });
    render(node);
  };
  [].slice.call(document.querySelectorAll(selector)).forEach(init);
  selectors[selector] = selectors[selector] || init;
};

export {h, bind, React};
