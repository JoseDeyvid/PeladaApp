import React from 'react'
import { RiCloseLine } from "react-icons/ri"
import "./styles.css"

const ModalWhoLost = ({ setIsOpen }) => {
    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Fim do jogo</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        Quem perdeu?
                    </div>
                    {/* <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                                Delete
                            </button>
                            <button
                                className="cancelBtn"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ModalWhoLost