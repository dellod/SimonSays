
// Sounds
const blueSound = new Audio("sounds\\blue.mp3")
const greenSound = new Audio("sounds\\green.mp3")
const redSound = new Audio("sounds\\red.mp3")
const yellowSound = new Audio("sounds\\yellow.mp3")
const wrongSound = new Audio("sounds\\wrong.mp3")

// Buttons
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;

// Functions
function playSpecificSound(colour) {
    switch(colour) {
        case "blue":
            blueSound.play();
            break;
        case "green":
            greenSound.play();
            break;
        case "red":
            redSound.play();
            break;
        case "yellow":
            yellowSound.play();
            break;
        case "wrong":
            wrongSound.play();
            break;
    }
}

function addNewRandomGamePatternAndAnimate() {
    level += 1;
    $("#level-title").text(`Level ${level}`)
    const randChosenColour = buttonColours[Math.floor(Math.random() * 4)]
    gamePattern.push(randChosenColour);
    $(`#${randChosenColour}`).animate({opacity: 0}).animate({opacity: 1})
    playSpecificSound(randChosenColour)

}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] == gamePattern[currentIndex]) {
        return true
    }
    else {
        return false
    }
}

function wrongAnswerRestart() {
    // Play wrong noise
    playSpecificSound("wrong")
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200);

    // Reset variables
    isGameStarted = false
    level = 0
    userClickedPattern = []
    gamePattern = []

    // Change level title
    $("#level-title").text("Game Over, Press Any Key to Restart")
}

function addFunctionalityToButtons() {
    $(".btn").on("click", function() {
        const userChosenColour = this.getAttribute("id")
        userClickedPattern.push(userChosenColour)
        playSpecificSound(userChosenColour)
        animatePress(userChosenColour)
        isCorrect = checkAnswer(userClickedPattern.length - 1)
        if (!isCorrect) {
            wrongAnswerRestart()
        }
        else if (isCorrect && (userClickedPattern.length == gamePattern.length)) {
            setTimeout(() => {
                addNewRandomGamePatternAndAnimate();
            }, 1000)
            userClickedPattern = []
        }
    })
}

function addStartKeyFunctionality() {
    $("html").on("keypress", (event) => {
        if (!isGameStarted) {
            addNewRandomGamePatternAndAnimate()
            isGameStarted = true;
        }
    })
}

// MAIN
addFunctionalityToButtons()
addStartKeyFunctionality()

