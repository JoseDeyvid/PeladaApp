import "./styles.css"

const ListOfGames = ({ teams, teamsPlaying, setModalEditTeamIsOpen, setEditingTeam }) => {

    const handleClickTeam = (id) => {
        if (id == teamsPlaying[0] || id >= teamsPlaying[1]) {
            setModalEditTeamIsOpen(true);
            setEditingTeam(id)
        }
    }
    return (
        <div className='list-of-games'>
            {teams.map((team, i) => (
                <ul key={i} className={`${teamsPlaying.includes(i) ? "isPlaying" : ""}`} onClick={() => handleClickTeam(i)}>
                    {team.map((player, i) => (
                        <li key={i}>{i + 1} - {player}</li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default ListOfGames