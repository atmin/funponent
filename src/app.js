import {h, bind} from './funponent';

const hello = (data) => (
  <div>
    hello, <span>{data.name}</span>
    <pre>
      <code>
        {Object.keys(data)
          .map(key => `data-${key}=${data[key]}`)
          .join('\n')}
      </code>
    </pre>
  </div>
);

const another = () => <div>42</div>;

bind('[data-component=hello]', hello);
bind('[data-component=another]', another);
