import React from 'react'
import './App.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function App() {

  const navigate = useNavigate();
  const [playersPerTeam, setPlayersPerTeam] = useState(5);

  const handleSubmit = () => {
    navigate('/draw-players');
  }

  return (
    <div>
      <form action="/DrawPlayers" onSubmit={handleSubmit}>
        <label htmlFor="">Insira a quantidade de jogadores por equipe: </label>
        <input type="number" value={playersPerTeam} onChange={(e) => setPlayersPerTeam(e.target.value)} />
        <button type='submit'>Confirmar</button>
      </form>
    </div>
  )
}

export default App
