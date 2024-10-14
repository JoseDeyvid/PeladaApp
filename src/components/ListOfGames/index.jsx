import React from 'react'
import "./styles.css"

const ListOfGames = ({teams}) => {
    return (
        <div className='list'>
            {teams.map((team, i) => (
                <ul key={i}>
                    {team.map((player, i) => (
                        <li key={i}>{i + 1} - {player}</li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default ListOfGames