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
        var answer = new Array();

        display.innerHTML = question.text;

        Object.keys(question).forEach(function(element, index) {
            answer[index] = element;
            console.log(element);
            console.log(index);
          });
        //display the first question
        display.innerHTML = question.text;
        answer.forEach(function(element) {
            display.innerHTML = element;
            console.log(element);
          });


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