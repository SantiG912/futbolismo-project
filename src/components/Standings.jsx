import React from 'react'
import useFetch from '../api/useFetch';
import GroupStandings from './GroupStandings';
import LeagueStandings from './LeagueStandings';

export default function Standings({competitionId}) {
    const {
        data: standingsData, 
        loading: standingsLoading, 
        error: standingsError
    } = useFetch(`competitions/${competitionId}/standings`);

    if(standingsError) return <p>Error cargando posiciones: {standingsError}</p>
    if(standingsLoading) return <p>Cargando posiciones...</p>
    if(!standingsData) return <p>No hay data.</p>
    console.log(standingsData);

    const groupStandings = standingsData?.standings?.filter(
        s => s.stage === 'ALL'
    );
    
    return (
        <>
            {groupStandings?.length
                ? <GroupStandings standings={groupStandings}/>
                : <LeagueStandings table={standingsData?.standings[0]?.table}/>
            }
        </>
        );
}