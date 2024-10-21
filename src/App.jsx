import './App.css'
import { useState } from 'react'
import InputDefault from './components/InputDefault';
import ListOfPlayers from './components/ListOfPlayers';
import ButtonDefault from './components/ButtonDefault';
import ListOfGames from './components/ListOfGames';
import Timer from './components/Timer';
import ModalWhoLost from './components/ModalWhoLost';

function App() {

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [player, setPlayer] = useState("")
  const [teams, setTeams] = useState([]);
  const [playersPerTeam] = useState(2);
  const [teamsPlaying, setTeamsPlaying] = useState([0, 1]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddPlayer = () => {
    setListOfPlayers([...listOfPlayers, player])
    if (teams.length !== 0) {
      if (teams[teams.length - 1].length < playersPerTeam) {
        const tempArray = [...teams[teams.length - 1], player]
        setTeams((prevValue) => [...prevValue.filter((value) => value.length === playersPerTeam), [...tempArray]]);
      } else {
        setTeams((prevValue) => [...prevValue, [player]])
      }
    }
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
    while (newList.length >= playersPerTeam) {
      const tempArray = newList.splice(0, playersPerTeam);
      setTeams((prevValue) => [...prevValue, tempArray]);
    }
    if (newList.length > 0) {
      setTeams((prevValue) => [...prevValue, newList]);
    }
  }

  const nextGame = (teamId) => {
    let team = teams[teamId];
    if (teams[teams.length - 1].length < playersPerTeam) {
      const tempArray = [...teams[teams.length - 1], ...team];
      team = tempArray.splice(0, playersPerTeam);
      setTeams((prevValue) => [...prevValue.filter((value) => value.length === playersPerTeam), [...team], [...tempArray]]);
    } else {
      setTeams((prevValue) => [...prevValue, [...team]])
    }
    setModalIsOpen(false);
    redefineTeamsPlaying(teamId);

  }

  const redefineTeamsPlaying = (losingTeamId) => {
    let newTeamPlaying;

    if (teamsPlaying[0] > teamsPlaying[1]) {
      newTeamPlaying = teamsPlaying[0] + 1;
    } else {
      newTeamPlaying = teamsPlaying[1] + 1;
    }

    if (teamsPlaying[0] === losingTeamId) {
      setTeamsPlaying([teamsPlaying[1], newTeamPlaying])
    } else {
      setTeamsPlaying([teamsPlaying[0], newTeamPlaying])
    }
  }

  return (
    <div>
      <InputDefault id={"player-name"} labelTxt={"Insira o nome do jogador:"} handleChangeInput={(e) => setPlayer(e.target.value)} />
      <ButtonDefault handleClickBtn={handleAddPlayer} btnTxt={"Adicionar"} />
      <ListOfPlayers list={listOfPlayers} />
      <ButtonDefault handleClickBtn={drawPlayers} btnTxt={"Sortear times"} disabled={teams.length > 0} />
      <ListOfGames teams={teams} handleNextGame={nextGame} teamsPlaying={teamsPlaying} />
      {teams.length > 0 && <Timer gameTime={8} setModalIsOpen={setModalIsOpen} />}
      {modalIsOpen && <ModalWhoLost handleCloseModal={() => setModalIsOpen(false)} teams={teams} teamsPlayingId={teamsPlaying} handleNextGame={nextGame} />}
    </div>
  )
}

export default App
