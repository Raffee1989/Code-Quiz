//Array of Questions, Options, Correct Answers!
var questions = 
    [
        {
            ask: "If soccer is called football in England, what is American football called in England?",
            options: ["American Football", "Combball", "Handball", "Touchdown"],
            response: ["American Footbal"]  
        },
        {   
            ask: "What is the largest country in the world?",
            options: ["Russia", "Canada", "China", "United States"],
            response: "Russia"
        },
        {
            ask: "A doctor with a Ph.D is a doctor of what?",
            options: ["Philosophy", "Phrenology", "Psychology", "Physical Therapy"],
            response: "Psychology"
        },
        {
            ask: "What state is the largest state of the United States of America?",
            options: ["Alaska", "California", "Texas", "Washington"],
            response: "Alaska"
        },
        {
            ask: "What is the fastest land animal?",
            options: ["Pronghorn Antelope", "Lion", "Thomson’s Gazelle", "Cheetah"],
            response: "Cheetah"
        }   
    ]

//Assigning Needed Variables
var score = 0;
var ongoingQuestion = -1;
var remainingTime = 0;
var countDown;



//Countdown Starts Running if the Start Buttons is Clicked.
function begin() {

remainingTime = 75;
document.getElementById("remainingTime").innerHTML = remainingTime;

countDown = setInterval(function() {
    remainingTime--;
    document.getElementById("remainingTime").innerHTML = remainingTime;
    //Game Should be Stopped Ones the Countdown Reaches Zero.
    if (remainingTime <= 0) {
        clearInterval(countDown);
        endGame(); 
    }
}, 1000);

next();
}

//Countdonw Stops here to Finish The Game.
function endGame() {
    clearInterval(countDown);

    var quizDetails = `
    <h2>Here You Are!</h2>
    <h3>You got ` + score +  ` /100!</h3>
    <h4>You had ` + score / 20 +  ` questions correct!</h4>
    <input type="text" id = "name" placeholder = "Initial"> 
    <button onclick="setScore()" type= button class= btn btn-danger>Set score!</button>`;

    document.getElementById("quizSection").innerHTML = quizDetails;
}

//All the Data Goes to Data Storage.
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    takeScore();
}


function takeScore() {
var quizDetails = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()" type= button class= btn btn-danger>Clear score!</button>
    <button onclick="resetGame()" type= button class= btn btn-danger>Play Again!</button>`;

    document.getElementById("quizSection").innerHTML = quizDetails;
}

//Clears the Data from Storage ones the Clear Button is Clicked
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

// The Game Start Again
function resetGame() {
    clearInterval(countDown);
    score = 0;
    ongoingQuestion = 0;
    remainingTime = 0;
    countDown = null;

    document.getElementById("remainingTime").innerHTML = remainingTime;

    var quizDetails = `
    <h1>Funny Question Quiz!</h1>
    <h3>Click to play!</h3>
    <button onclick="begin()"type= button class= btn btn-danger>Start?</button>`;

    document.getElementById("quizSection").innerHTML = quizDetails;
}

// Wrong Response Deducts 10 Seconds
function wrongAnswer() {
    remainingTime -= 10; 
    next();
    }

    //Adding 20 to Score
    function right() {
    score += 20;
    next();
}

//Looping Question Array
function next() {
    ongoingQuestion++;

    if (ongoingQuestion > questions.length) {
    endGame();
    return;
}

var quizDetails = "<h2>" + questions[ongoingQuestion].ask + "</h2>"

for (var i = 0; i < questions[ongoingQuestion].options.length; i++) 
{
    var code = "<button onclick = \"[ANS]\" type= button class= btn btn-danger>[CHOICE]</button>"; 
    code = code.replace("[CHOICE]", questions[ongoingQuestion].options[i]);

    if (questions[ongoingQuestion].options[i] == questions[ongoingQuestion].response) 
    {
        code = code.replace("[ANS]", "right()");
    } else {
            code = code.replace("[ANS]", "wrongAnswer()");
            }
            quizDetails += code
    }


    document.getElementById("quizSection").innerHTML = quizDetails;
}