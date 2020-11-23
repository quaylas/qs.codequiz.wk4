// Define question list
const questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: {
            A: "Strings",
            B: "Booleans",
            C: "Alerts",
            D: "Numbers"
        },
        correctAnswer: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: {
            A: "Numbers and Strings",
            B: "Other Arrays",
            C: "Objects",
            D: "All of the above"
        },
        correctAnswer: "D"
    },
    {
        question: "Which of the following is the correct way to initialize a FOR loop that will run 3 times?",
        answers: {
            A: "for (var i = 0, i < 3, i++){...};",
            B: "for (var i = 0; i < 3; i++){...};",
            C: "for (var i = 0; i < 4; i++){...};",
            D: "for (var i = 0, i < 2, i++){...};"
        },
        correctAnswer: "B"
    },
    {
        question: "Which of the following DOM methods will allow the user to type a response?",
        answers: {
            A: "alert('Please enter some text.');",
            B: "confirm('Please enter some text.');",
            C: "prompt.innerHTML('Please enter some text.');",
            D: "prompt('Please enter some text.');"
        },
        correctAnswer: "D"
    },
    {
        question: "Which of the following will declare a new empty variable with type BOOLEAN?",
        answers: {
            A: "var trueFalse = new Boolean;",
            B: "var trueFalse = new trueFalse;",
            C: "var trueFalse = 'true';",
            D: "var trueFalse = 'false';"
        },
        correctAnswer: "A"
    }
]

// Retrieve variables from document
var bodyEl = document.querySelectorAll("body");
var quizHeaderEl = document.querySelector(".secondary-header");
var quizContentEl = document.querySelector(".quiz-content");
var startButtonEl = document.querySelector("#start");


// create question containers
var questionTextEl = document.createElement("h3");
quizContentEl.appendChild(questionTextEl);
var questionAnswersEl = document.createElement("ul");

// Set quiz time limit, starting question and initial score
var timeLeft = 90;
var score = 0;
var questionIndex = 0;

// function to create and display timer
var startTimer = setInterval(function(){
        if (timeLeft > 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " seconds.";
            timeLeft--;
        }
        else if (timeLeft === 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " second.";
            timeLeft--;
        }
        else {
            clearInterval(startTimer);
            endQuiz();
        }
    }, 1000);

var stopTimer = function() {
    clearInterval(startTimer);
};

// function to end quiz
var endQuiz = function(){
    // clear previous question content
    quizContentEl.innerHTML = "";
    questionAnswersEl.innerHTML = "";
    stopTimer();
    quizHeaderEl.innerHTML= "";

    // if time has expired, display that in the secondary header
    if (timeLeft === 0){
        quizHeaderEl.textContent = "Time has expired!";
        console.log("quiz ended because time expired");
    }

    // if all questions were answered, display that in the secondary header
    else {
        quizHeaderEl.textContent = "You've completed all questions!";
        console.log("quiz ended because all questions were answered");
    }

    // display the player's score and prompt them to enter their name
};

var checkAnswer = function() {
    // detect selected answer and pull its ID
    var userChoice = event.target;
    var choiceId = userChoice.getAttribute("data-choiceId");

    // pull correct answer from questions array
    var correctAnswer = questions[questionIndex].correctAnswer;

    // increment the score for a correct answer
    if (choiceId === correctAnswer){
        console.log(`${choiceId} is the right answer!`);
        score++;
    }
    // apply a time penalty of -10s for an incorrect answer
    else {
        console.log(`That's incorrect. The correct answer was ${correctAnswer}`);
        timeLeft = timeLeft - 5;
    }

    // increment the question index
    questionIndex++;

    // if there are still questions remaining, display the next question
    if (questionIndex < questions.length) {
        console.log(questionIndex, questions[questionIndex]);
        nextQuestion(questions, questionIndex);
    }
    // if there are no questions remaining, end the quiz
    else {
        console.log("the quiz has ended");
        endQuiz();
    }
};

// insert question, wait for an answer to be selected, and check the answer
var nextQuestion = function (questionArray, questionIndex){
    // clear previous question content
    quizContentEl.innerHTML = "";
    questionAnswersEl.innerHTML = "";

    // populate question text
    questionTextEl.textContent = questionArray[questionIndex].question;
    quizContentEl.appendChild(questionTextEl);

    // add question answers to list
    var answerAEl = document.createElement("li");
    answerAEl.textContent = "A. " + questionArray[questionIndex].answers.A;
    answerAEl.className = "answer-choice";
    answerAEl.setAttribute("data-choiceId", "A");
    questionAnswersEl.appendChild(answerAEl);
    var answerBEl = document.createElement("li");
    answerBEl.className = "answer-choice";
    answerBEl.setAttribute("data-choiceId", "B");
    answerBEl.textContent = "B. " + questionArray[questionIndex].answers.B;
    questionAnswersEl.appendChild(answerBEl);
    var answerCEl = document.createElement("li");
    answerCEl.className = "answer-choice";
    answerCEl.setAttribute("data-choiceId", "C");
    answerCEl.textContent = "C. " + questionArray[questionIndex].answers.C;
    questionAnswersEl.appendChild(answerCEl);
    var answerDEl = document.createElement("li");
    answerDEl.className = "answer-choice";
    answerDEl.setAttribute("data-choiceId", "D");
    answerDEl.textContent = "D. " + questionArray[questionIndex].answers.D;
    questionAnswersEl.appendChild(answerDEl);

    // push list into quiz-content
    quizContentEl.appendChild(questionAnswersEl);

    // check answer
    document.querySelectorAll(".answer-choice").forEach(item => {item.addEventListener("click", checkAnswer)});
};

// Function to start quiz
var startQuiz = function (){
    // Start startTimer
    startTimer;
    // insert question
    nextQuestion(questions, questionIndex);
};


// execute startQuiz when the START button is clicked
startButtonEl.addEventListener("click", startQuiz);