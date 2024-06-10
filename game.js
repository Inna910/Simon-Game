const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;



function nextSequence() {
  let ramdomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[ramdomNumber];
  gamePattern.push(randomChosenColour);

  let increasedLevel = level++;
  $('h1').text("Level " + increasedLevel)

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

}



$(".btn").on("click", function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);

    let clickedColor = $(this);
    animatePress(clickedColor)
    
    checkAnswer(userClickedPattern.length - 1)

    })


function playSound(name){
    switch (name) {
        case 'red': 
            const red = new Audio("sounds/red.mp3");
            red.play()
            break;
        case 'blue':
            const blue = new Audio("sounds/blue.mp3");
            blue.play()
            break;
        case 'green':
            const green = new Audio("sounds/green.mp3");
            green.play()
            break;
        case 'yellow':
            const yellow = new Audio("sounds/yellow.mp3");
            yellow.play()
            break;
        default: console.log(this);
        break;
        };
}

function animatePress(currentColor) {
   currentColor.addClass("pressed");

   setTimeout(function() {
    currentColor.removeClass("pressed");
}, 100)
}


$(document).on("keydown", function(event){
    $('h1').text("Level " + level)
    nextSequence();
    $(document).unbind(event)
})


function checkAnswer(currentLevel){

   if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
       setTimeout(nextSequence, 1000);
       userClickedPattern = [];
    } 
} else {
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play()

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
}
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    $(document).on("keydown", function(event){
        $('h1').text("Level " + level)
        nextSequence();
        $(document).unbind(event);
    })
}