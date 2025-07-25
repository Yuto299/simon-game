let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let started = false;
let level = 0;

// ボタンがひかる
function flashButton(randomChosenColor) {
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// 次の色を決める
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("レベル" + level); // 通常の表示

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
  playSound();
}
// ユーザーがボタンをクリックした時の処理
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor); // (配列に入れるもの)
  console.log(userClickedPattern);

  flashButton(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userChosenColor.length - 1); //正解数
});

// サウンド再生
function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// アニメーションが入る
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 開始の部分
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("レベル" + level); //最初の表示
    nextSequence();
    started = true;
  }
});

// 回答を確認する
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("正解");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("不正解");

    playSound("sounds/wrong");
    $("#level-title").text("ゲームオーバー！Aキーで再スタート");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
