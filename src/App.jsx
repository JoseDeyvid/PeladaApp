import React from 'react'
import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [player, setPlayer] = useState("")
  const [drawnPlayers, setDrawnPlayers] = useState([]);

  const handleAddPlayer = (e) => {
    setListOfPlayers([...listOfPlayers, player])
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const drawPlayers = () => {
    const newList = listOfPlayers.map((player) => player);
    shuffleArray(newList);
    setDrawnPlayers([...newList]);
  }

  const handleTest = () => {
    console.log(listOfPlayers)
    console.log(drawnPlayers)
  }

  return (
    <div>
      <div className="input-group">
        <label htmlFor="">Insira o nome do jogador:</label>
        <input type="text" onChange={(e) => setPlayer(e.target.value)} />
        <button onClick={handleAddPlayer}>Adicionar</button>
      </div>
      <ul>
        {listOfPlayers.map((player, i) => (
          <li key={i}>{i+1} - {player}</li>
        ))}
      </ul>
      <button onClick={drawPlayers}>Sortear times</button>
      <ul>
        {drawnPlayers.map((player, i) => (
          <li key={i}>{player}</li>
        ))}
      </ul>

      <button onClick={handleTest}>test</button>
    </div>
  )
}

export default App
