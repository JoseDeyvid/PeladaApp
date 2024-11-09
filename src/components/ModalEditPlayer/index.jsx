import React, { useState } from 'react'
import "../ModalWhoLost/styles.css"

const ModalEditPlayer = ({ player, handleCloseModal, changePlayerName }) => {

    const [playerEdited, setPlayerEdited] = useState(player)

    const handleClickSave = () => {
        handleCloseModal();
        changePlayerName(playerEdited);
    }

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
                            <input type="text" value={playerEdited} onChange={(e) => setPlayerEdited(e.target.value)} />
                            <button onClick={handleClickSave}>Salvar</button>
                            <button>Excluir jogador</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditPlayer