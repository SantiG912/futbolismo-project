import React, { useEffect, useState } from 'react'
const {VITE_API_URL: apiUrl} = import.meta.env;

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

                const response = await fetch(`${apiUrl}/api/${url}`);

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