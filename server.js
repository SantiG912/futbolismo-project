import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;

const app = express();
app.use(cors({
    origin: "*",
}));

app.get("/api/:endpoint*", async (req, res) => {
    try{
        const endpoint = req.params.endpoint + (req.params[0] || "");
        const apiUrl = `https://api.football-data.org/v4/${endpoint}`;

        const response = await fetch(apiUrl,{
            headers:{
                "X-Auth-Token": apiKey,
            }
        });
        const data = await response.json();
        res.json(data);

    }catch(error){
        console.error("Error fetching data: ", error);
        res.status(500).json({ error: "Error fetching data" });
        
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on: ${PORT}`); 
}); 