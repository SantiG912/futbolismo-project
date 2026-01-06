import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../api/useFetch';
import Standings from './Standings';
import Scorers from './Scorers';
import Matches from './Matches';
import CompetitionMatches from './CompetitionMatches';

export default function DetailedCompetition() {
    const { id } = useParams();
    const {data, loading, error} = useFetch(`competitions/${id}`);
    
    return (
        <section className="detailed-competition-container">
            {error && <p>Error: {error}</p>}
            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                data && (
                    <article className="detailed-competition-card">
                        <img 
                        src={data.emblem} 
                        alt={data.name} 
                        />
                        <h2>{data.name}</h2>
                        <p>Área: {data.area?.name}</p>
                        <p>Temporada actual: {data.currentSeason?.startDate} → {data.currentSeason?.endDate}</p>
                    </article>
                )
            )}
            <Standings competitionId={id}/>
            <Scorers competitionId={id}/>
            <CompetitionMatches competitionId={id}/>
        </section>
    )
}
