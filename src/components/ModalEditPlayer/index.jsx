import React from 'react'
import "../ModalWhoLost/styles.css"

const ModalEditPlayer = ({ player, handleCloseModal }) => {

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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditPlayer