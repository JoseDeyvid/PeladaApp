import React from 'react'
import "../ModalWhoLost/styles.css"

const ModalEditTeam = ({ team, handleCloseModal, setPlayerBeingEdited }) => {

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
                                <p onClick={() => setPlayerBeingEdited(player)} key={i}>{player}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditTeam