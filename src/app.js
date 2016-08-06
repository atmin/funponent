import {h, bind} from './funponent';

const hello = (data) => (
  <body>
    hello, <span>{data.name}</span>
    <pre>
      <code>
        {Object.keys(data)
          .map(key => `${key}="${data[key]}"`)
          .join('\n')}
      </code>
    </pre>
    <ul className={'grid-list'}>
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

const item = (data) => <body>{data.what}</body>;

const svg = (data) => (
  <body>
    <svg viewBox="0 0 100 100">
      <ellipse cx="50" cy="80" rx="46" ry="19" fill="#07c" />
      <path
        d={'M43,0c-6,25,16,22,1,52c11,3,19,0,19-22c38,18,16,63-12,64c-25,2-55-39-8-94'}
        fill={'#e34'} />
      <path
        d={'M34,41c-6,39,29,32,33,7c39,42-69,63-33-7'}
        fill={'#fc2'}
        style={`opacity: ${data.opacity}`} />
    </svg>
  </body>
);

bind('[data-component=hello]', hello);
bind('[data-component=item]', item);
bind('[data-component=svg]', svg);
