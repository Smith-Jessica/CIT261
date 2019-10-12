 // When the user scrolls down 20px from the top of the document, show the button
 window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function buildQuiz(){
    //AJAX to get json file for quiz questions
    var display = document.getElementById("question");
    
    var xmlhttp = new XMLHttpRequest();      
    xmlhttp.open("GET", "questions.json");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();      
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var question = JSON.parse(this.responseText);
        
        displayFirstQuestion(display, question);
        removeButton();

      } else {
        display.innerHTML = "Loading...";
      };
    }

}
function displayFirstQuestion(display, question) {
    display.innerHTML = question.q1.text + "<br>";

    //display the first question
    for(var x = 0; x < question.q1.answers.length; x++){

        var target = document.getElementById("question");
        
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = "radio";
        input.id = "input";
        input.className = "radio";

        label.innerHTML = "&nbsp;"+question.q1.answers[x]+"<br>";
        
        //input.innerHTML = "&nbsp;"+question.q1.answers[x]+"<br>";
        document.getElementById("question").appendChild(input);
        document.getElementById("question").appendChild(label);
        
        //document.getElementById("input").appendChild("&nbsp;"+question.q1.answers[x]+"<br>")
        //input.innerHTML = "&nbsp;"+question.q1.answers[x]+"<br>";
       // var input = "<input type='radio'>&nbsp;"+question.q1.answers[x]+"<br>";

        //html.innerHTML = input;
        //target.parentNode.insertBefore(input, target.nextSibling);
        
    }
    var button = document.createElement('button');
    button.innerHTML = "Next Question";
    document.getElementById("question").appendChild(button);
    target = input;
    //target.parentNode.insertBefore(button, target.nextSibling);

}

function removeButton() {
    var button = document.getElementById("takeQuiz");
    button.parentNode.removeChild(button);
}

function checkAnswer() {
    if(document.getElementById("q1").value == "A"){
        document.getElementById("message1").innerHTML = "That is correct!";
    }
    else{
        document.getElementById("message1").innerHTML = "Incorrect! Try again.";
    }

}