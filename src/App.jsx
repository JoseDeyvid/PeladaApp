import React from 'react'
import './App.css'
import { useState } from 'react'

function App() {

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [player, setPlayer] = useState("")
  // const [drawnPlayers, setDrawnPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playersPerTeam] = useState(5);

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
    // setDrawnPlayers([...newList]);
    let i = 0;
    while (newList.length >= playersPerTeam) {
      const tempArray = newList.splice(0, playersPerTeam);
      setTeams((prevValue) => [...prevValue, tempArray]);
    }
    if (newList.length > 0) {
      setTeams((prevValue) => [...prevValue, newList]);
    }
  }

  return (
    <div>
      <div className="input-group">
        <label htmlFor="player-name">Insira o nome do jogador:</label>
        <input id='player-name' name='player-name' type="text" onChange={(e) => setPlayer(e.target.value)} />
        <button onClick={handleAddPlayer}>Adicionar</button>
      </div>
      <ul>
        {listOfPlayers.map((player, i) => (
          <li key={i}>{i + 1} - {player}</li>
        ))}
      </ul>

      <button onClick={drawPlayers}>Sortear times</button>

      <div className='list'>
        {teams.map((team, i) => (
          <ul key={i}>
            {team.map((player, i) => (
              <li key={i}>{i + 1} - {player}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default App
