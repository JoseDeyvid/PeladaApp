import React from 'react'
import "./styles.css"

const ListOfGames = ({ teams, handleNextGame }) => {
    return (
        <div className='list'>
            {teams.map((team, i) => (
                <ul key={i} onClick={() => handleNextGame(i)}>
                    {team.map((player, i) => (
                        <li key={i}>{i + 1} - {player}</li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default ListOfGames