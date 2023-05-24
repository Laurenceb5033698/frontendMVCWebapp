
async function ApiFetch(table) {
    const response = await fetch("http://localhost:5020/Scoreboard/"+table);
    const jsonData = await response.json();
    return (jsonData);
}

async function GetLeaderboardData(){
    ApiFetch("Scoreboard").then(jsonData =>{
        console.log(jsonData);
        const mainTable = document.getElementById("scoreTable");
        //empty existing entries
        mainTable.replaceChildren();
        
        let position = 1;
        jsonData.forEach(entry => {
            //create html
            let tableRow = document.createElement('tr');
            let tdPos = document.createElement('td');
            let tdName = document.createElement('td');
            let tdScore = document.createElement('td');
            //fill in data
            tdPos.innerText = JSON.stringify((position++));
            tdName.innerText = entry.name;
            tdScore.innerText = JSON.stringify(entry.score);
            //append to table structure
            tableRow.appendChild(tdPos);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdScore);
            //store row in array
            mainTable.appendChild(tableRow);
        });
                
    });
    
}

//run fetch
GetLeaderboardData();