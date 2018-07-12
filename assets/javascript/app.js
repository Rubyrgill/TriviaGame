$(document).ready(function () {



    //VARIABLES 
    //__________________________________________

    //Create an array to hold questions in Object Array
    var Questions = [{
        //Question One:
        question: "Who wrote the Harry Potter book series?",
        answerList: ["Julia Roberts", "J.K Rowling", "J.B Rolling", "Stephenie Meyer"],
        answer: 1
    }, {
        //Question Two:
        question: "What sport does Harry play at Hogwarts?",
        answerList: ["Soccer", "Air-ball", "Wizard War", "Quidditch"],
        answer: 3
    }, {
        //Question Three:
        question: "What was Harry's position on the Quidditch team?",
        answerList: ["Reciever", "Seeker", "Protector", "Defense"],
        answer: 2
    }, {
        //Question Four:
        question: "Which talking item of clothing assigned Harry his house?",
        answerList: ["Shoe", "Glove", "Scarf", "Hat"],
        answer: 3
    }, {
        //Question Five:
        question: "Which house was Harry a member of?",
        answerList: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
        answer: 0
    }, {
        //Question Five: TRUE/FALSE
        question: "Harry uses the train platform 9 3/4 to travel to Hogwarts.",
        answerList: ["True", "False"],
        answer: 0
    }, {
        //Question Six: TRUE/FALSE
        question: "Harry marries Hermione Granger?",
        answerList: ["True", "False"],
        answer: 2
    }]


    //Win counters 
    var correctChoices = 0;
    var wrongChoices = 0;

    //current question to store from loop
    var currentQuestion = 0;

    //holds input from user
    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    //timer variables
    var sec = 0;
    var time = 0;

    //messages for new screen after answer result 
    var messages = {
        correct: "Good Job!...You are a real Wizard!",
        incorrect: "Wrong Choice!",
        endTime: "TIME'S UP!",
        finished: "Game Over"
    }

    //FUNCTIONS 
    //__________________________________________

    //Starting the game function, call to reset later 
    function startGame() {
        //clear html
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
        //clear counter
        currentQuestion = 0;
        correctChoices = 0;
        WrongChoices = 0;
        unanswered = 0;
        //call to generate first question 
        newQuestion()
        //Game Background 
        $("body").css('background-image', 'url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/J9H9WF0/night-sky-full-of-stars-fantasy-animation-made-of-magical-sparkly-white-and-yellow-light-particles-flickering-on-a-dark-purple-background_bmdspwrvl_thumbnail-full01.png")');
    }

    //Counter
    function countDown() {
        //seconds per question
        sec = 10;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        //seconds countdown
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
        //if seconds left is less than 1, then clear timer as player ran out of time 
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            //also displays answerPage function, to let player know they ran out of time for the question
            answerPage()
        }
    }


    //New Question function 
    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;

        //sets up new question
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
        //timer
        countDown();

        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    //Answer Page
    function answerPage() {
        //Clears question page
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        //holds the place for answer
        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        //correct answer place in array
        var rightAnswerIndex = Questions[currentQuestion].answer;

        //checks to see correct, wrong, or unanswered
        //if player chooses the right answer 
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            //then wins increase by one
            correctChoices++;
            //and the correct message displays on new screen
            $('#message').html(messages.correct);
            //if player chooses wrong answer
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            //wrong answer count goes up by one
            wrongChoices++;
            $('#message').html(messages.incorrect);
            //correct answer displays
            $('#wrongAnswers').html('The correct answer was: ' + rightAnswerText);
        } else {
            //if player does not choose one before the timer runs out
            unanswered++;
            $('#message').html(messages.endTime);
            $('#wrongAnswers').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        //once the last question is complete display scoreboard
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            //otherwise, display next question 
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        }
    }
    //scoreboard at the end of the game
    function scoreBoard() {
        //clear the timer, and correctedAnswer 
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();

        //display message 
        $('#message').html(messages.finished);
        //final counter results
        $('#correctAnswers').html("Correct Answers: " + correctChoices);
        $('#wrongAnswers').html("Wrong Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);
        //reset game 
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Start Over?');
    }


    //PROCESS
    //___________________________________________

    //start button 
    $('#startBtn').on('click', function () {
        $(this).hide();
        startGame();
    });
    //reset button
    $('#startAgainBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

});



