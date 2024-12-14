import "./styles.css";
import React, { useState } from "react";
import "../ModalWhoLost/styles.css";

const ModalEditPlayer = ({
  player,
  handleCloseModal,
  changePlayerName,
  deletePlayer,
  listOfPlayers,
  teams,
}) => {
  const [playerEdited, setPlayerEdited] = useState(player);

  const handleClickSave = () => {
    let playerAlreadyExists = false;
    if (
      !playerEdited.trim() ||
      listOfPlayers.includes(playerEdited.toLowerCase())
    ) {
      alert("Não é possível inserir um nome vazio ou que já existe!");
      return;
    }

    teams.forEach((team) => {
      if (team.includes(playerEdited.toLowerCase())) playerAlreadyExists = true;
    });

    if (playerAlreadyExists) {
      alert("Não é possível inserir um nome vazio ou que já existe!");
      return;
    }

    handleCloseModal();
    changePlayerName(playerEdited);
  };
  const handleClickDelete = () => {
    if (
      confirm(
        "Tem certeza que deseja excluir esse jogador? Essa ação não poderá ser desfeita!"
      )
    ) {
      console.log(player);
      handleCloseModal();
      deletePlayer(player);
    }
  };

  return (
    <>
      <div className="darkBG" onClick={handleCloseModal} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Editando jogador...</h5>
          </div>
          <div className="editPlayerContent">
            <div className={"player"}>
              <p>{player}</p>
              <input
                type="text"
                value={playerEdited}
                onChange={(e) => setPlayerEdited(e.target.value)}
              />
              <div className="actions">
                <button onClick={handleClickSave}>Salvar</button>
                <button className="finish-game" onClick={handleClickDelete}>
                  Excluir jogador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditPlayer;
