import React from 'react'
import useFetch from '../api/useFetch'
import { Link } from 'react-router-dom';

/* ERROR 429 === SE ALCANZO EL LIMITE DE PETICIONES !!! */

export default function Competitions() {
    const {data, loading, error} = useFetch("competitions");
    
    return (
        <section className="competition-container">
            {error && <p>Error: {error}</p>}
            {loading ? (
                <section>
                    <p>Cargando datos...</p>
                </section>
            ) : (
                <section className="competition-content">
                    {Array.isArray(data?.competitions) && data.competitions.map((competition) => (
                        <Link
                        to={`/competitions/${competition.id}`}
                        key={competition.id}
                        >
                        <article className="competition-card">
                            <img 
                            src={competition.emblem} 
                            alt="" 
                            />
                            <h3>{competition.name}</h3>
                        </article>
                        </Link>
                    ))}
                </section>
            )}
        </section>
    )
}
