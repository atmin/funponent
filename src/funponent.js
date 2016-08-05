import morphdom from 'morphdom';

const h = (nodeName, attributes, ...children) => {
  const node = document.createElement(nodeName);
  Object.keys(attributes || {}).forEach(name => {
    node.setAttribute(name, attributes[name]);
  });
  children.forEach(child => {
    node.appendChild(typeof (child || '') === 'string' ?
      document.createTextNode(child || '') : child
    );
  });
  return node;
};

const bind = (selector, view) => {
  const render = node =>
    morphdom(node, view(node.dataset), {childrenOnly: true});

  const qsa = sel => [].slice.call(document.querySelectorAll(sel));

  qsa(selector).forEach(node => {
    const observer = new MutationObserver(mutations => {
      const datasetMutations = mutations.filter(
        mut => (mut.attributeName || '').startsWith('data-')
      );
      if (datasetMutations.length) {
        render(node);
      }
    });
    observer.observe(node, {attributes: true});
    render(node);
  });
};

export {h, bind};
