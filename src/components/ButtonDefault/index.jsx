import React from 'react'

const ButtonDefault = ({ handleClickBtn, btnTxt, disabled=false }) => {
    return (
        <button onClick={handleClickBtn} disabled={disabled}>{btnTxt}</button>
    )
}

export default ButtonDefault