$(document).ready(function () {
    //VARIABLES 
    //__________________________________________

    //Create an array to hold questions in Object Array
    var questions = "";

    //Hold counters 
    var correctChoices = 0;
    var wrongChoices = 0;
    var currentQuestion = 0;
    var unanswered = 0;


    //FUNCTIONS 
    //________________________________________

    function countDownTimer() {
        $(".chooseAnswer").click(function () {
            $(this).data('clicked', true);
        });
        var i = 30;
        var interval = setInterval(function () {
            if (i < 10) {
                $("#timerSeconds").html("0" + i);
                $(".chooseAnswer").on('click', function () {
                    clearInterval(interval)
                })
            } else {
                $("#timerSeconds").html(i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(interval);
                })
            }
            if (i === 0) {
                unanswered++;
                clearInterval(interval);
                currentQuestion++;
                $("#timer").effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestion);
            } else {
                i--;
            }
        }, 1000);
    }

})




    //PROCESS
    //___________________________________________






