let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

function flashButton(randomChosenColor) {
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  flashButton(userChosenColor);
});

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

nextSequence();
