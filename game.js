var buttoncolors = ["red","blue","green","yellow"];

var gamepattern = [];

var userclickedpattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
})

$(".btn").click(function() {

    var userchosencolor = $(this).attr("id");

    userclickedpattern.push(userchosencolor);

    playsound(userchosencolor);

    animatepress(userchosencolor);
    checkanswer(userclickedpattern.length-1);
})






function checkanswer(currentlevel){

    if(gamepattern[currentlevel]=== userclickedpattern[currentlevel]){
        
    console.log("success");
    
    if(userclickedpattern.length===gamepattern.length){

    setTimeout(function(){
        nextsequence();
        
    },1000);
}
}
else {
    console.log("wrong");
    playsound("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
}
}

function nextsequence()
{
    userclickedpattern=[];

    level++;

    $("#level-title").text("Level " + level);

    var random = Math.floor(Math.random() *4) ;  // Generate a random number between 1 and 4
                                                // Display the generated random number in the console
    
    var randomcolorchooser= buttoncolors[random];

    
    gamepattern.push(randomcolorchooser);
    
    $("#" + randomcolorchooser).fadeIn(100).fadeOut(100).fadeIn(100);   // Make the chosen color flash on screen for a short time to indicate that
    
    playsound(randomcolorchooser);

    animatepress(randomcolorchooser);
}


function playsound(name)
{
    
    var audio = new Audio("sounds/" + name + ".mp3").play();
}


function animatepress(currentcolor)
{
    $ ("#" + currentcolor ).addClass("pressed");
    setTimeout( function(){
        $("#"+ currentcolor).removeClass("pressed")}, 100);
}


function startOver(){
    level = 0;
    gamepattern = [];
    started = false;
}