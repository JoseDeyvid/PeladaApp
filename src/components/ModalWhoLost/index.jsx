import React from 'react'
import { RiCloseLine } from "react-icons/ri"
import "./styles.css"

const ModalWhoLost = ({ handleCloseModal, teams, teamsPlayingId, handleNextGame }) => {
    return (
        <>
            <div className="darkBG" onClick={handleCloseModal} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Fim do jogo</h5>
                    </div>
                    <button className="closeBtn" onClick={handleCloseModal}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        Quem perdeu?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <div onClick={() => handleNextGame(teamsPlayingId[0])}>
                                {teams[teamsPlayingId[0]].map((player, i) => (
                                    <p key={i}>{player}</p>
                                ))}
                            </div>
                            <div onClick={() => handleNextGame(teamsPlayingId[1])}>
                                {teams[teamsPlayingId[1]].map((player, i) => (
                                    <p key={i}>{player}</p>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalWhoLost