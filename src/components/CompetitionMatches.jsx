import React, { useEffect, useState } from 'react'
import useFetch from '../api/useFetch';
import { formatDate } from '../api/formatDate';
import getRelevantMatchday from '../api/getRelevantMatchday';

export default function CompetitionMatches({ competitionId }) {
  
  const {
    data: matchData,
    loading: matchLoading,
    error: matchError
  } = useFetch(`competitions/${competitionId}/matches`);

  console.log(matchData);

  const [selectedMatchday, setSelectedMatchday] = useState(null);

  const matches = matchData?.matches ?? [];
  
  const matchesByMatchday = React.useMemo(() => {

    return matches.reduce((acc, match) => {

      if (!Number.isFinite(match.matchday)) {
        return acc;
      }

      const day = match.matchday;

      if (!acc[day]) acc[day] = [];
      acc[day].push(match);

      return acc;
    }, {});
  }, [matches]);


  const currentMatchday = React.useMemo(() => {
    if(Object.keys(matchesByMatchday).length === 0) return null;
    return getRelevantMatchday(matchesByMatchday);
  }, [matchesByMatchday]);

  useEffect(() => {
    
    if (!currentMatchday) return;

    if (
      selectedMatchday === null ||
      !matchesByMatchday[selectedMatchday]
    ){
      setSelectedMatchday(currentMatchday);
    }

  }, [currentMatchday, selectedMatchday, matchesByMatchday]);


  if(matchLoading || matchData === null)return <p>Cargando partidos...</p>;
  if(matchError)return <p>Error cargando los partidos</p>;
  if(!matchData)return <p>No hay respuesta del servidor</p>;
  if(matches.length === 0)return <p>No hay partidos disponibles</p>;
  if(!currentMatchday)return <p>No hay jornadas disponibles</p>;

  return (
    <section className="matches-container">
      <h3>Partidos</h3>

      <select
        value={selectedMatchday ?? ""}
        onChange={e => setSelectedMatchday(Number(e.target.value))}
      >
        
        {Object.keys(matchesByMatchday)
          .sort((a, b) => a - b)
          .map(day => (
            <option key={day} value={day}>
              Jornada {day}
            </option>
          ))}
      </select>

      <section className="matchday-table">

        {matchesByMatchday[selectedMatchday]?.map(match => (
          <section key={match.id} className="matches">

            <img
              src={match.homeTeam.crest}
              alt={match.homeTeam.shortName}
            />

            <span className="matchday-teams">
              {match.homeTeam.name}{" "}
              {match.score.fullTime.home}
              {" - "}
              {match.score.fullTime.away}{" "}
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
  );
}
