import React from 'react'
import './styles.css'

const ListOfPlayers = ({ list }) => {
    return (
        <ul className='list'>
            {list.map((player, i) => (
                <li key={i}>{i + 1} - {player}</li>
            ))}
        </ul>
    )
}

export default ListOfPlayers