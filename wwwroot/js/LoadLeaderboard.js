
async function ApiFetch(table) {
    const response = await fetch("http://localhost:5020/Scoreboard/"+table);
    const jsonData = await response.json();
    return (jsonData);
}

async function GetLeaderboardData(){
    ApiFetch("Scoreboard").then(jsonData =>{
        console.log(jsonData);
        
    });
    
}

//run fetch
GetLeaderboardData();