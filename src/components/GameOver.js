import React from 'react';

const GameOver = (props) => {
  return (
    <div className='overlay'>
      <div className='gameover_box'>
        <h2>Game over</h2>
        <p>Your final score was: {props.score}</p>
        <button onClick={props.close}>x</button>
      </div>
    </div>
  );
};

export default GameOver;