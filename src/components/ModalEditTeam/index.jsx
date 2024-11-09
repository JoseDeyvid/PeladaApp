import React from 'react'
import "../ModalWhoLost/styles.css"
import ButtonDefault from '../ButtonDefault';

const ModalEditTeam = ({ team, handleCloseModal }) => {

    return (
        <>
            <div className="darkBG" onClick={handleCloseModal} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Editando time...</h5>
                    </div>
                    <div className="editTeamContent">
                        <div className={"players"}>
                            {team.map((player, i) => (
                                <p key={i}>{player}</p>
                            ))}
                        </div>
                    </div>
                    {/* <div className="btn-container">
                        <ButtonDefault btnTxt={'Confirmar'} handleClickBtn={() => handleNextGame(loserId)} disabled={loserId === null} />
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ModalEditTeam