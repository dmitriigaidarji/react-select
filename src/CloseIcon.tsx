import * as React from 'react';
const margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
};
const viewbox = {
  width: 48,
  height: 48
}
const CloseIcon = () => <svg className="react-select-token-close" height="16" width="16" viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}>
  {/*<path*/}
  {/*  d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>*/}
  {/*<path d="M0 0h16v16h-16z" fill="none"/>*/}
  <line
    x1={margin.left}
    x2={viewbox.width - margin.right}
    y1={margin.top}
    y2={viewbox.height - margin.bottom}
  />
  <line
    x1={margin.left}
    x2={viewbox.width - margin.right}
    y1={viewbox.height - margin.bottom}
    y2={margin.top}
  />
</svg>

export default React.memo(CloseIcon);
