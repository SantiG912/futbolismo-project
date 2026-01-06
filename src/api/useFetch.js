import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if(!url) return;

        const fetchData = async() => {

            try{

                setLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:3001/api/${url}`);

                if(!response.ok){
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setData(data);

            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
        
    }, [url]);

    return {data, loading, error};
}