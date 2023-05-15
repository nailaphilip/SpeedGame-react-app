import React from 'react';

const Circle = (props) => {
  return (
    <div
      className={props.active ? 'circle active' : 'circle'}
      onClick={props.click}
      style={{ pointerEvents: props.gameStatus ? 'all' : 'none' }}>
    </div>
  );
};

export default Circle;