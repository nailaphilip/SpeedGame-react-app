import React, { Component } from "react";
import Circle from "./components/Circle";
import GameOver from "./components/GameOver";

import startSound from "./assets/sounds/gamestart.mp3";
import endSound from "./assets/sounds/gameover.wav";

import { circles } from "./circles";

let gameStartSound = new Audio(startSound);
let gameEndSound = new Audio(endSound);

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    circles: circles,
    score: 0,
    current: 0,
    speed: 1000,
    gameOver: false,
    gameOn: false,
    counter: 0,
  };

  timer;

  clickHandler = (item) => {
    if (this.state.current !== item) {
      return this.stopHandler();
    }

    this.setState({
      score: this.state.score + 10,
      counter: this.state.counter - 1,
    });
  };

  randomNumb = () => {
    if (this.state.counter >= 5) {
      return this.stopHandler();
    }

    let nextActive;

    do {
      nextActive = getRndInt(1, this.state.circles.length);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      speed: this.state.speed * 0.95,
      counter: this.state.counter + 1,
    });
    this.timer = setTimeout(this.randomNumb, this.state.speed);
  };

  startHandler = () => {
    gameStartSound.play();
    this.setState({
      gameOn: !this.state.gameOn,
    });
    this.randomNumb();
  };

  stopHandler = () => {
    gameStartSound.pause();
    gameEndSound.play();
    clearTimeout(this.timer);
    this.setState({
      gameOver: !this.state.gameOver,
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: !this.state.gameOver,
      gameOn: !this.state.gameOn,
      score: 0,
      current: 0,
      speed: 1000,
      counter: 0,
    });
  };

  render() {
    return (
      <div>
        <h1>Speedgame</h1>
        <h2>Score: {this.state.score}</h2>
        <div className="circles">
          {this.state.circles.map((circle) => (
            <Circle
              key={circle}
              click={() => this.clickHandler(circle)}
              active={this.state.current === circle}
              gameStatus={this.state.gameOn}
            />
          ))}
        </div>
        {this.state.gameOver && (
          <GameOver close={this.closeHandler} score={this.state.score} />
        )}

        {this.state.gameOn ? (
          <button onClick={this.stopHandler}>Stop</button>
        ) : (
          <button onClick={this.startHandler}>Start</button>
        )}
      </div>
    );
  }
}

export default App;
