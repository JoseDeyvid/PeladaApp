import React from 'react'
import './styles.css'

const ButtonDefault = ({ handleClickBtn, btnTxt, disabled=false }) => {
    return (
        <button className='button-default' onClick={handleClickBtn} disabled={disabled}>{btnTxt}</button>
    )
}

export default ButtonDefault