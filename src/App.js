import React from "react";
import StartGame from "./components/StartGame/StartGame";
import TopPlayers from "./components/TopPlayers/TopPlayers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <StartGame />
      <TopPlayers />
    </div>
  );
}

export default App;
