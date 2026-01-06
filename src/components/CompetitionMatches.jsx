import React from 'react'
import useFetch from '../api/useFetch';
import { formatDate } from '../api/formatDate';

export default function CompetitionMatches({competitionId}) {
    const {
        data: matchData, 
        loading: matchLoading, 
        error: matchError
    } = useFetch(`competitions/${competitionId}/matches`);

    if(matchError) return <p>Error cargando los partidos: {matchError}</p>
    if(matchLoading) return <p>Cargando partidos...</p>
    if(!matchData) return <p>No hay datos.</p>
    console.log(matchData);

    const matchesByMatchday = matchData?.matches?.reduce((acc, match) => {
        const matchday = match.matchday;

        if(!acc[matchday]){
            acc[matchday] = [];
        }
        acc[matchday].push(match);
        return acc;
    }, {});
    
    return (
        matchData && (
            <section className="matches-container">
                {Object.entries(matchesByMatchday).map(([matchday, matches]) => (
                    <section key={matchday} className="matchday-section">
                        <h3 className="matchday-title">
                            Jornada {matchday}
                        </h3>
                        <section className="matchday-table">
                            {matches.map(match => (
                                <section key={match.id} className="matches">
                                    <img 
                                    src={match.homeTeam.crest}
                                    alt={match.homeTeam.shortName}
                                    />
                                    <span className="matchday-teams">
                                        {match.homeTeam.name}
                                        {" "}
                                        {match.score.fullTime.home}
                                        {" - "}
                                        {match.score.fullTime.away}
                                        {" "}
                                        {match.awayTeam.name}
                                    </span>
                                    <img 
                                    src={match.awayTeam.crest}
                                    alt={match.awayTeam.shortName}
                                    />
                                    <span className="matchday-date">
                                        {formatDate(match.utcDate)}
                                    </span>
                                </section>
                            ))}
                        </section>
                    </section>
                ))}
            </section>
        )
    );
}
