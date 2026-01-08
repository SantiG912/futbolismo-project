export default function getRelevantMatchday(matchesByMatchday) {
    const today = new Date();
    
    const matchdays = Object.keys(matchesByMatchday)
        .map(Number)
        .sort((a, b) => a - b);
    
    for(const day of matchdays){
        const matches = matchesByMatchday[day];

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
        if(matches.some(m => m.status === "SCHEDULED")){
            return day;
        }
    }

    return null;
    
}
