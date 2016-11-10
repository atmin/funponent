import {h} from '../../funponent';

export default function(data) {
  return (
    <body>
      <p style={{fontSize: '120%'}}>
        hello, <span>{data.name}</span>
      </p>
      <p non-existant-attr={null}>
        A list of <code>{data.count}</code> inline elements follows.
        Each element is a nested component.
      </p>
      <ul className={'ph1 list'}>
        {Array
          .apply(null, Array(parseInt(data.count)))
          .map((el, index) => (
            <li
              className={'helloItem pr2 dib'}
              data-what={index} />
          ))}
      </ul>
    </body>
  );
}
