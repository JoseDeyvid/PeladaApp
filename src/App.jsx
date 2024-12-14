import "./App.css";
import { useEffect, useRef, useState } from "react";
import ListOfPlayers from "./components/ListOfPlayers";
import ButtonDefault from "./components/ButtonDefault";
import ListOfGames from "./components/ListOfGames";
import Timer from "./components/Timer";
import ModalWhoLost from "./components/ModalWhoLost";
import ModalEditTeam from "./components/ModalEditTeam";
import ModalEditPlayer from "./components/ModalEditPlayer";
import ReturnMatch from "./components/ReturnMatch/ReturnMatch";

function App() {
  const [player, setPlayer] = useState("");
  const [historyOfMatchs, setHistoryOfMatchs] = useState(
    JSON.parse(localStorage.getItem("@historyOfMatchs")) || [[0, 1]]
  );
  const [listOfPlayers, setListOfPlayers] = useState(
    JSON.parse(localStorage.getItem("@listOfPlayers")) || []
  );
  const [teams, setTeams] = useState(
    JSON.parse(localStorage.getItem("@teams")) || []
  );
  const [playersPerTeam] = useState(5);
  const [teamsPlaying, setTeamsPlaying] = useState(
    JSON.parse(localStorage.getItem("@teamsPlaying")) || [0, 1]
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditTeamIsOpen, setModalEditTeamIsOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [playerBeingEdited, setPlayerBeingEdited] = useState(null);
  const inputPlayerRef = useRef();
  const [gameTime] = useState(8);
  const [timer, setTimer] = useState(
    `00:${gameTime > 9 ? gameTime : "0" + gameTime}:00`
  );
  const Ref = useRef(null);

  const saveInLS = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  const handleAddPlayer = () => {
    let playerAlreadyExists = false;
    if (!player.trim() || listOfPlayers.includes(player.toLowerCase())) {
      alert("Não é possível inserir um nome vazio ou que já existe!");
      return;
    }
    teams.forEach((team) => {
      if (team.includes(player)) playerAlreadyExists = true;
    });
    if (playerAlreadyExists) return;

    setListOfPlayers([...listOfPlayers, player.toLowerCase()]);
    saveInLS("@listOfPlayers", [...listOfPlayers, player]);
    if (teams.length !== 0) {
      if (teams[teams.length - 1].length < playersPerTeam) {
        const tempArray = [...teams[teams.length - 1], player];
        setTeams((prevValue) => [
          ...prevValue.filter((value) => value.length === playersPerTeam),
          [...tempArray],
        ]);
        saveInLS("@teams", [
          ...teams.filter((value) => value.length === playersPerTeam),
          [...tempArray],
        ]);
      } else {
        setTeams((prevValue) => [...prevValue, [player]]);
        saveInLS("@teams", [...teams, [player]]);
      }
    }
    inputPlayerRef.current.value = "";
    inputPlayerRef.current.focus();
  };

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
      saveInLS("@teams", [
        ...(JSON.parse(localStorage.getItem("@teams")) || []),
        tempArray,
      ]);
    }
    if (newList.length > 0) {
      setTeams((prevValue) => [...prevValue, newList]);
      saveInLS("@teams", [
        ...(JSON.parse(localStorage.getItem("@teams")) || []),
        newList,
      ]);
    }
  };

  const nextGame = (teamId) => {
    let team = teams[teamId];
    if (teams[teams.length - 1].length < playersPerTeam) {
      const tempArray = [...teams[teams.length - 1], ...team];
      team = tempArray.splice(0, playersPerTeam);
      setTeams((prevValue) => [
        ...prevValue.filter((value) => value.length === playersPerTeam),
        [...team],
        [...tempArray],
      ]);
      saveInLS("@teams", [
        ...teams.filter((value) => value.length === playersPerTeam),
        [...team],
        [...tempArray],
      ]);
    } else {
      setTeams((prevValue) => [...prevValue, [...team]]);
      saveInLS("@teams", [...teams, [...team]]);
    }
    setModalIsOpen(false);
    Ref.current = null;
    redefineTeamsPlaying(teamId);
  };

  const redefineTeamsPlaying = (losingTeamId) => {
    let newTeamPlaying;

    if (teamsPlaying[0] > teamsPlaying[1]) {
      newTeamPlaying = teamsPlaying[0] + 1;
    } else {
      newTeamPlaying = teamsPlaying[1] + 1;
    }

    if (teamsPlaying[0] === losingTeamId) {
      setTeamsPlaying([teamsPlaying[1], newTeamPlaying]);
      saveInLS("@teamsPlaying", [teamsPlaying[1], newTeamPlaying]);
    } else {
      setTeamsPlaying([teamsPlaying[0], newTeamPlaying]);
      saveInLS("@teamsPlaying", [teamsPlaying[0], newTeamPlaying]);
    }
  };

  const changePlayerName = (newName) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => {
        if (team === teams[editingTeam]) {
          return team.map((player) => {
            if (player === playerBeingEdited) {
              return newName;
            }
            return player;
          });
        }
        return team;
      })
    );

    saveInLS(
      "@teams",
      teams.map((team) => {
        if (team === teams[editingTeam]) {
          return team.map((player) => {
            if (player === playerBeingEdited) {
              return newName;
            }
            return player;
          });
        }
        return team;
      })
    );
  };

  const deletePlayer = (name) => {
    let newTeams = teams;

    if (listOfPlayers.length > playersPerTeam * 2) {
      if (teams[teamsPlaying[0]].includes(name)) {
        const index = newTeams[teamsPlaying[0]].indexOf(name);
        for (let i = index; i < playersPerTeam; i++) {
          if (i === playersPerTeam - 1) {
            if (newTeams[teamsPlaying[1] + 1][0]) {
              newTeams[teamsPlaying[0]][i] = newTeams[teamsPlaying[1] + 1][0];
            } else {
              newTeams[teamsPlaying[0]].pop();
            }
          } else {
            if (newTeams[teamsPlaying[0]][i + 1]) {
              newTeams[teamsPlaying[0]][i] = newTeams[teamsPlaying[0]][i + 1];
            } else {
              newTeams[teamsPlaying[0]].pop();
            }
          }
        }
        for (let i = teamsPlaying[1] + 1; i < teams.length; i++) {
          for (let j = 0; j < newTeams[i].length; j++) {
            if (j === newTeams[i].length - 1) {
              if (i + 1 < newTeams.length) {
                newTeams[i][j] = newTeams[i + 1][0];
              } else {
                newTeams[i].pop();
                if (newTeams[i].length === 0) {
                  newTeams.pop();
                  break;
                }
              }
            } else {
              newTeams[i][j] = newTeams[i][j + 1];
            }
          }
        }
      } else {
        for (let i = teamsPlaying[1]; i < newTeams.length; i++) {
          if (newTeams[i].includes(name)) {
            const index = newTeams[i].indexOf(name);
            for (let j = index; j < newTeams[i].length; j++) {
              if (j === newTeams[i].length - 1) {
                if (i + 1 < newTeams.length) {
                  newTeams[i][j] = newTeams[i + 1][0];
                } else {
                  newTeams[i].pop();
                  if (newTeams[i].length === 0) {
                    setPlayerBeingEdited(null);
                    setModalEditTeamIsOpen(false);
                    setModalIsOpen(false);
                    newTeams.pop();
                    break;
                  }
                }
              } else {
                newTeams[i][j] = newTeams[i][j + 1];
              }
            }

            for (let j = i + 1; j < newTeams.length; j++) {
              for (let k = 0; k < newTeams[j].length; k++) {
                if (k === newTeams[j].length - 1) {
                  if (j + 1 < newTeams.length) {
                    newTeams[j][k] = newTeams[j + 1][0];
                  } else {
                    newTeams[j].pop();
                    if (newTeams[j].length === 0) {
                      setPlayerBeingEdited(null);
                      setModalEditTeamIsOpen(false);
                      setModalIsOpen(false);
                      newTeams.pop();
                      break;
                    }
                  }
                } else {
                  newTeams[j][k] = newTeams[j][k + 1];
                }
              }
            }
          }
        }
      }
    }
    setTeams([...newTeams]);
    saveInLS("@teams", [...newTeams]);
  };

  const resetAllHandler = () => {
    if (
      confirm(
        "Essa ação resetará todos os dados e você terá que iniciar a pelada do zero. Tem certeza disso?"
      )
    ) {
      setListOfPlayers([]);
      setPlayer("");
      setTeams([]);
      setTeamsPlaying([0, 1]);
      setTimer(`00:${gameTime > 9 ? gameTime : "0" + gameTime}:00`);
      if (Ref.current) clearInterval(Ref.current);
      saveInLS("@listOfPlayers", []);
      saveInLS("@teams", []);
      saveInLS("@teamsPlaying", [0, 1]);
      saveInLS("@historyOfMatchs", [[0, 1]]);
    }
  };

  return (
    <div className="container">
      <ButtonDefault
        btnTxt={"Reiniciar pelada!"}
        handleClickBtn={resetAllHandler}
      />
      <div className="add-player">
        <input
          id={"player-name"}
          name={"player-name"}
          type="text"
          onChange={(e) => setPlayer(e.target.value)}
          placeholder={"Nome do jogador..."}
          className="input-default"
          ref={inputPlayerRef}
        />
        <ButtonDefault handleClickBtn={handleAddPlayer} btnTxt={"+"} />
      </div>
      <ListOfPlayers list={listOfPlayers} />
      <ButtonDefault
        handleClickBtn={drawPlayers}
        btnTxt={"Sortear times"}
        disabled={teams.length > 0}
      />
      <ListOfGames
        teams={teams}
        handleNextGame={nextGame}
        teamsPlaying={teamsPlaying}
        setEditingTeam={setEditingTeam}
        setModalEditTeamIsOpen={setModalEditTeamIsOpen}
      />
      {teams.length > 0 && (
        <ReturnMatch
          setTeams={setTeams}
          teams={teams}
          teamsPlaying={teamsPlaying}
          setTeamsPlaying={setTeamsPlaying}
          playersPerTeam={playersPerTeam}
          historyOfMatchs={historyOfMatchs}
          setHistoryOfMatchs={setHistoryOfMatchs}
        />
      )}
      {teams.length > 0 && (
        <Timer
          gameTime={gameTime}
          setModalIsOpen={setModalIsOpen}
          timer={timer}
          setTimer={setTimer}
          Ref={Ref}
          teams={teams}
          playersPerTeam={playersPerTeam}
        />
      )}
      {modalIsOpen && (
        <ModalWhoLost
          handleCloseModal={() => setModalIsOpen(false)}
          teams={teams}
          teamsPlayingId={teamsPlaying}
          handleNextGame={nextGame}
        />
      )}

      {modalEditTeamIsOpen && (
        <ModalEditTeam
          handleCloseModal={() => setModalEditTeamIsOpen(false)}
          team={teams[editingTeam]}
          setPlayerBeingEdited={setPlayerBeingEdited}
        />
      )}

      {playerBeingEdited && (
        <ModalEditPlayer
          player={playerBeingEdited}
          handleCloseModal={() => setPlayerBeingEdited(null)}
          changePlayerName={changePlayerName}
          deletePlayer={deletePlayer}
        />
      )}
    </div>
  );
}

export default App;
