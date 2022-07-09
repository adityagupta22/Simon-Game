var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started=false;

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    buttonAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
})

$(document).keypress(function(){
    if(!started){
        started=true;
        nextSequence();
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomColour=buttonColours[randomNumber];
    gamePattern.push(randomColour);

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomColour);
    $("h1").text("Level "+level);
}

function checkAnswer(len){
    if(userClickedPattern[len]==gamePattern[len]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length)
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Press any key to restart");

        startOver();
    }
}

function playSound(colour){
    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function buttonAnimation(colour){
    $("#"+colour).addClass("pressed");
      setTimeout(function () {
        $("#" + colour).removeClass("pressed");
      }, 100);
}

function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}