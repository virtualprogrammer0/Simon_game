var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("LvL " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    
    userClickedPattern = [];

    level++;

    $("#level-title").text("LvL " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


};

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

$(".btn").click(function() {
    
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

    var name1 = '#' + currentColor;
    $(name1).addClass("pressed");
    setTimeout(function() {
        $(name1).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
