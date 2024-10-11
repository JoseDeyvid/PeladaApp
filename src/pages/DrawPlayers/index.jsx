import React, { useState } from 'react'

const DrawPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addPlayer = () => {
    setPlayers([...players, inputValue])
  }

  const drawPlayers = () => {
    console.log(shuffleArray(players))
  }

  function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  return (
    <div>
      <div className="list">
        <ul>
          {players.map((player, i) => (
            <li key={i}>{i + 1} - {player}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="">Digite o nome do jogador: </label>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addPlayer}>Adicionar</button>
        <button onClick={drawPlayers}>Sortear</button>
      </div>
    </div>
  )
}

export default DrawPlayers