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
        //var qkeys = Object.keys(question);
        //var answer = new Array();
        display.innerHTML = question.q1.text;

        //display the first question
        for(var x = 0; x < question.q1.answers.length; x++){

            var target = document.getElementById("question");
            
            var html = document.createElement('div');
            
            var input = "<input type='radio'>&nbsp;"+question.q1.answers[x]+"<br>";

            html.innerHTML = input;
            target.parentNode.insertBefore(html, target.nextSibling);
            
        }
        var button = document.createElement('button');
        button.innerHTML = "Next Question";
        document.body.appendChild(button);
        target = button;
        target.parentNode.insertBefore(html, target.nextSibling);

      } else {
        display.innerHTML = "Loading...";
      };
    }

}

function checkAnswer() {
    if(document.getElementById("q1").value == "A"){
        document.getElementById("message1").innerHTML = "That is correct!";
    }
    else{
        document.getElementById("message1").innerHTML = "Incorrect! Try again.";
    }

}