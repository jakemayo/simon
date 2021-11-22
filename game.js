
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-text").text("Level: " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){    //Start of a function for when it hears a click
    let userChosenColour = $(this).attr("id");   
    userClickedPattern.push(userChosenColour);   //Pushes the users clicked pattern of the colors into an array 
    playSound(userChosenColour);  //When the user clicks on a color/button, it plays a sound for that button clicked
    animatePress(userChosenColour);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern =[];
    level++; //setting level counter to 0
    $("#level-title").text("Level: " + level); // Targeting the H1 to display the current level
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];  //picking a random color in the array using the random number
    gamePattern.push(randomChosenColour);  //pushing the chosen color onto the array
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Animation affect
    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100 );
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

