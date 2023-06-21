import React, { useEffect, useState } from "react";
import SnakeGame from "../SnakeGame/SnakeGame";
import http from "../../api/http";
import "./StartGame.css";

function StartGame() {
  const [nickName, setNickName] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleNicknameChange = (event) => {
    setNickName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (nickName.length >= 3 && nickName.length <= 16) {
      setStartGame(true);
      setIsGameOver(false);
    } else {
      alert("Ник должен содержать от 3 до 16 символов!");
    }
  };

  useEffect(() => {
    if (startGame && isGameOver) {
      postGameOver(nickName, score);
      setScore(0);
      setStartGame(false);
    }
  }, [startGame, isGameOver]);

  if (startGame && !isGameOver) {
    return (
      <SnakeGame
        score={score}
        setScore={setScore}
        setIsGameOver={setIsGameOver}
      />
    );
  }

  return (
    <div className="start-game-container">
      <h2>Start Game</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={nickName}
          onChange={handleNicknameChange}
          placeholder="Введите ник (3-16 символов)"
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

const postGameOver = async (nickName, score) => {
  try {
    await http.post("score/gameOver", {
      nickName,
      score,
    });
  } catch (error) {
    console.error(error);
  }
};

export default StartGame;
