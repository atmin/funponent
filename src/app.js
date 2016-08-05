import {h, bind} from './funponent';

const hello = (data) => (
  <body>
    hello, <span>{data.name}</span>
    <pre>
      <code>
        These are all my attributes
        <br />
        <br />
        {Object.keys(data)
          .map(key => `data-${key}=${data[key]}`)
          .join('\n')}
      </code>
    </pre>
    <ul>
      {Array
        .apply(null, Array(parseInt(data.count)))
        .map((el, index) => (
          <li
            data-component={'item'}
            data-what={index} />
        ))}
    </ul>
  </body>
);

const item = (dataset) => <body>{dataset.what}</body>;

bind('[data-component=hello]', hello);
bind('[data-component=item]', item);
