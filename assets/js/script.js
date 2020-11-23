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
            A: "for (var i = 0, i < 3, i++){}",
            B: "for (var i = 0; i < 3; i++){}",
            C: "for (var i = 0; i < 4; i++){}",
            D: "for (var i = 0, i < 2, i++){}"
        },
        correctAnswer: "B"
    }
]

// Retrieve variables from document
var quizHeaderEl = document.querySelector(".secondary-header");
var quizContentEl = document.querySelector(".quiz-content");
var startButtonEl = document.querySelector("#start");


// create question containers
var questionTextEl = document.createElement("h3");
quizContentEl.appendChild(questionTextEl);
var questionAnswersEl = document.createElement("ul");

// Set quiz time limit, starting question and initial score
var timeLeft = 60;
var score = 0;
var questionIndex = 0;

var checkAnswer = function() {
    var userChoice = event.target;
    var choiceId = userChoice.getAttribute("data-choiceId");
    var correctAnswer = questions[questionIndex].correctAnswer;
    if (choiceId === correctAnswer){
        console.log(`${choiceId} is the right answer!`);
        score++;
    }
    else {
        console.log(`That's incorrect. The correct answer was ${correctAnswer}`);
        timeLeft = timeLeft - 5;
    }
    questionIndex++;

    if (questionIndex < questions.length) {
        console.log(questionIndex, questions[questionIndex]);
        insertQuestion(questions, questionIndex);
    }
    else {
        console.log("the quiz has ended");
    }
}

var timer = function (){
    // create countdown effect using setInterval
    var countdown = setInterval(function(){
        if (timeLeft > 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " seconds.";
            timeLeft--;
        }
        else if (timeLeft === 1){
            quizHeaderEl.textContent = "Time Remaining: " + timeLeft + " second.";
            timeLeft--;
        }
        else {
            quizHeaderEl.textContent = "Time has expired!";
            clearInterval(countdown);
        }
    }, 1000)
};

// inject question
var insertQuestion = function (questionArray, questionIndex){
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
}

// Function to start quiz
var startQuiz = function (){
    // Start timer
    timer();
    // Clear welcome content
    quizContentEl.innerHTML = "";
    insertQuestion(questions, questionIndex);
    
};


// execute startQuiz when the START button is clicked
startButtonEl.addEventListener("click", startQuiz);