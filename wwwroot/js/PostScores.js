
async function postScoreToLeaderboard(gameSpecificPath, userName, userScore) {

  const response = await fetch("http://localhost:5020/Scoreboard/" + gameSpecificPath, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:userName, score:userScore})
  });

  response.json().then(resData => {
    console.log(JSON.stringify(resData));
  });

}

  //export {postScoreToLeaderboard}