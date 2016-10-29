import {h} from '../../funponent';

function svg(data) {
  const count = parseInt(data.count, 10);
  const step = 1 / (count || 1);
  let svgs = [];

  for (let i = 1; i <= count; i++) {
    svgs.push(
      <svg
        className={'dib ph2 w3'}
        viewBox={'0 0 100 100'}>
        <ellipse
          cx={'50'}
          cy={'80'}
          rx={'46'}
          ry={'19'}
          fill={'#07c'} />
        <path
          d={'M43,0c-6,25,16,22,1,52c11,3,19,0,19-22c38,18,16,63-12,64c-25,2-55-39-8-94'}
          fill={'#e34'} />
        <path
          d={'M34,41c-6,39,29,32,33,7c39,42-69,63-33-7'}
          fill={'#fc2'}
          style={`opacity: ${step * i}`} />
      </svg>
    );
  }

  return (
    <body>
      <p>
        <code>{data.count}</code> dynamically generated SVGs
      </p>
      {svgs}
    </body>
  );
}

svg.init = node => console.log('svg component initialized on node', node);

export default svg;
