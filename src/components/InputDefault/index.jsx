import React from 'react'
import ButtonDefault from '../ButtonDefault'

const InputDefault = ({id, labelTxt, handleChangeInput}) => {
    return (
        <div>
            <label htmlFor={id}>{labelTxt}</label>
            <input id={id} name={id} type="text" onChange={handleChangeInput} />
        </div>
    )
}

export default InputDefault