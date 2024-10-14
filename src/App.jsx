import React from 'react'
import './App.css'
import { useState } from 'react'
import InputDefault from './components/InputDefault';
import ListOfPlayers from './components/ListOfPlayers';
import ButtonDefault from './components/ButtonDefault';
import ListOfGames from './components/ListOfGames';

function App() {

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [player, setPlayer] = useState("")
  const [teams, setTeams] = useState([]);
  const [playersPerTeam] = useState(2);

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
      <InputDefault id={"player-name"} labelTxt={"Insira o nome do jogador:"} handleChangeInput={(e) => setPlayer(e.target.value)} />
      <ButtonDefault handleClickBtn={handleAddPlayer} btnTxt={"Adicionar"} />
      <ListOfPlayers list={listOfPlayers} />
      <ButtonDefault handleClickBtn={drawPlayers} btnTxt={"Sortear times"} disabled={teams.length > 0} />
      <ListOfGames teams={teams} />
    </div>
  )
}

export default App
