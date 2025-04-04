import React, { useState } from 'react'
import "./styles.css"
import ButtonDefault from '../ButtonDefault';

const ModalWhoLost = ({ handleCloseModal, teams, teamsPlayingId, handleNextGame }) => {
    const [loserId, setLoserId] = useState(null);

    return (
        <>
            <div className="darkBG" onClick={handleCloseModal} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Selecione quem ganhou</h5>
                    </div>
                    <div className="modalContent">
                        <div className={`teamPlaying ${loserId === teamsPlayingId[1] ? "selected" : ""}`} onClick={() => setLoserId(teamsPlayingId[1])}>
                            {teams[teamsPlayingId[0]].map((player, i) => (
                                <p key={i}>{player}</p>
                            ))}
                        </div>
                        <div className={`teamPlaying ${loserId === teamsPlayingId[0] ? "selected" : ""}`} onClick={() => setLoserId(teamsPlayingId[0])}>
                            {teams[teamsPlayingId[1]].map((player, i) => (
                                <p key={i}>{player}</p>
                            ))}
                        </div>
                    </div>
                    <div className="btn-container">
                        <ButtonDefault btnTxt={'Confirmar'} handleClickBtn={() => handleNextGame(loserId)} disabled={loserId === null} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalWhoLost