import "./styles.css"

const ListOfGames = ({ teams, teamsPlaying }) => {
    return (
        <div className='list'>
            {teams.map((team, i) => (
                <ul key={i} className={`${teamsPlaying.includes(i) ? "isPlaying" : ""}`}>
                    {team.map((player, i) => (
                        <li key={i}>{i + 1} - {player}</li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default ListOfGames