import React from 'react'

const ListOfPlayers = ({ list }) => {
    return (
        <ul>
            {list.map((player, i) => (
                <li key={i}>{i + 1} - {player}</li>
            ))}
        </ul>
    )
}

export default ListOfPlayers