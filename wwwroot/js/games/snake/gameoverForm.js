
class GameOverForm {

    constructor(_canvasSize, _delegate = function(){return 0;}) {
        this.canvasSize = _canvasSize;
        this.getScoreDelegate = _delegate;
        this.bGameActive = false;
    }


    //creates new dom elements.
    //REQUIRES certain ids or classes to exist on game page.
    addLeaderboardEntryForm(calculateScoreDelegate = function(){return 0;}) {
        //select first dom element with CLASS 'ScoreForm'
        let ScoreForm = select('.ScoreForm');
        if (!ScoreForm) {
            console.log("ScoreForm null! check div with class .ScoreForm exists in html.");
            return;
        }
        ScoreForm.position(0, 0, 'relative');

        let formElement = createInput('');
        formElement.id("formInputElement");
        formElement.position(this.canvasSize / 4 + 10, this.canvasSize / 2);
        formElement.size(this.canvasSize / 4);

        let button = createButton('submit');
        button.position(formElement.x + formElement.width + 20, formElement.y);
        //button.mousepressed takes a function for callback, but it isnt simple to then pass arguments.
        //therefore use an inline function to pass delegate to callback within the function.
        //button.mousePressed( function(callback) {
        //    callback(calculateScoreDelegate)
        //}(this.submittedCallback));//pass desired function to callback param
        button.mousePressed(this.submittedCallback);

        ScoreForm.child(formElement);
        ScoreForm.child(button);

        textAlign(CENTER);
        textSize(20);
    }

    //callback on submit button pressed
    submittedCallback() {
        let formElement = select('#formInputElement');
        const userName = formElement.value();
        const userScore = calculateScore();
        

        if (userName == '') {
            return;
        }
        //reset to prevent multi-submissions
        formElement.value('');

        postScoreToLeaderboard("TestPostScore", userName, userScore);
    }


    toggleForm(show) {
        let ScoreForm = select(".ScoreForm");
        if (show) {
            ScoreForm.style('display', 'block');
        } else {
            ScoreForm.style('display', 'none');
        }
    }
    
    draw() {
        if(this.bGameActive == false) {
            this.drawGameover();
        }
    }

    drawGameover() {
        fill(100, 30, 30);
        //rounded rect
        rect(this.canvasSize / 4, this.canvasSize / 4, this.canvasSize / 2, this.canvasSize / 2, 10, 10, 10, 10);
        fill(0);
        textAlign(CENTER);

        let textover = "Game Over";
        textSize(30);
        text(textover, (this.canvasSize / 2), this.canvasSize / 3);

        textSize(20);

        let textScore = "Score: " + numberOfCollectedFruit * 10;
        text(textScore, (this.canvasSize / 2), this.canvasSize / 2.5);

        let textSubmitPrompt = "Submit your score!";
        text(textSubmitPrompt, (this.canvasSize / 2), (this.canvasSize / 2));

        let textRetry = "Hit 'Enter' key to retry";
        text(textRetry, (this.canvasSize / 2), this.canvasSize / 2 + this.canvasSize / 5);

        //show form div
        //this.toggleForm(true);
    }
    
    updateGameActive(active){
        //if mode changed
        if(active != this.bGameActive) {
            this.bGameActive = active;  //update state
            this.toggleForm(!active);   //toggle form once, so we dont spam
        }
    }

}