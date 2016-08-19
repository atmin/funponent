<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://npmcdn.com/tachyons@4.0.5/css/tachyons.min.css" />
  <style>{% include '_style.css' %}</style>
</head>
<body class="w-100 sans-serif">
  <header class="pt4 pb4 white-80 bg-dark-gray">
    <div class="cf ph2 mw7 center">
      <h1 class="fl-l f2">
        <span class="red">f</span><span class="green">u</span><span class="blue">n</span>ponent
        <a class="f2 fw2 ml2 ph1 bg-white-80" style="border: 0"  href="https://github.com/atmin/funponent">src</a>
      </h1>
      <h2 class="fr-l tr-l f5 fw1 tracked">
        DOM is a pure function<br>
        State is <code>data-*</code> attributes<br>
        If it's changed, the view will follow
      </h2>
    </div>
  </header>

  <main class="ph2 mw7 center dark-gray lh-copy">
    <div class="pb1">
      <p>
        Use JS console to select component instances
        and change their <code>dataset</code> properties.
      </p>
    </div>

    <h2>
      <a href="https://github.com/atmin/funponent/blob/master/src/docs/components/hello.js">hello</a>
      component
    </h2>
    <p>
      <code><span class="blue">› </span>document.querySelector('#hello').dataset</code>
    <p>
    </p>
      <code><span class="blue">› </span>document.querySelector('#hello').dataset.name = 'funponent'</code>
    </p>
    <div
      id="hello"
      class="hello ph3 mb5 ba br3 b--dashed bg-near-white"
      data-count="5"
      data-name="world"></div>

    <h2>
      Another instance of hello
    </h2>
    <p>
      <code><span class="blue">› </span>document.querySelector('#another-hello').dataset</code>
    <p>
    </p>
      <code><span class="blue">› </span>document.querySelector('#another-hello').dataset.count = 42</code>
    </p>
    <div
      id="another-hello"
      class="hello ph3 mb5 ba br3 b--dashed bg-near-white"
      data-count="10"
      data-name="you"></div>

    <h2>
      funponent understands
      <a href="https://github.com/atmin/funponent/blob/master/src/docs/components/svg.js">SVG</a>
    </h2>
    <p>
      <code><span class="blue">› </span>document.querySelector('#svg').dataset</code>
    <p>
    </p>
      <code><span class="blue">› </span>document.querySelector('#svg').dataset.count = 81</code>
    </p>
    <div
      id="svg"
      class="svg tc pa2 mb5 ba br3 b--dashed bg-near-white"
      data-count="9"></div>
  </main>

  <script src="components.js"></script>
</body>

</html>
