export default function getRelevantMatchday(matchesByMatchday) {
    const today = new Date();
    
    const matchdays = Object.keys(matchesByMatchday)
        .map(Number)
        .filter(day => Number.isFinite(day))
        .sort((a, b) => a - b);
    
    if(matchdays.length === 0) return null;

    for(const day of matchdays){
        const matches = matchesByMatchday[day];

        if(!Array.isArray(matches)) continue;

        if(matches.some(
            m => 
                m.status === "IN_PLAY" ||
                new Date(m.utcDate).toDateString() === today.toDateString()
        )
        ){
            return day;
        }
    }

    for(const day of matchdays){
        const matches = matchesByMatchday[day];

        if(!Array.isArray(matches)) continue;

        if(matches.some(m => m.status === "SCHEDULED")){
            return day;
        }
    }

    return matchdays[0];
    
}
