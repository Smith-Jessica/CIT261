/*// When the user scrolls down 20px from the top of the document, show the button
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
*/
class Question {

    constructor(text, answers, score) {
        this.text = text;
        this.answers = answers;
        this.score = score;
    }
    getText() {
        return this.text;
    }
    getAnswers() {
        return this.answers;
    }
    getScore() {
        return this.score;
    }

}



function buildQuiz() {
    //AJAX to get json file for quiz questions

    var display = document.getElementById("quiz");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "questions.json");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // var question = new Question();
            var obj = JSON.parse(this.responseText);

            var q1 = obj.q1;
            var q2 = obj.q2;
            var q3 = obj.q3;
            var q4 = obj.q4;
            var q5 = obj.q5;

            var obj1 = Object.assign(new Question, q1);
            var obj2 = Object.assign(new Question, q2);
            var obj3 = Object.assign(new Question, q3);
            var obj4 = Object.assign(new Question, q4);
            var obj5 = Object.assign(new Question, q5);


            var objArray = [obj1, obj2, obj3, obj4, obj5];
            var currQ = 0;

            removeButton();
            displayQuestions(objArray, currQ);


        } else {
            // display.innerHTML = "Loading...";
        };
    }

}
function displayQuestions(questionArray, currQ) {



    for (var y = 0; y < questionArray.length; y++) {

        console.log(y);
        console.log(questionArray[y]);


        if (currQ == 0) {
            var display = document.createElement('div');
            display.id = "question";
            display.innerHTML = questionArray[y].getText() + "<br>";
            document.body.appendChild(display);
        }
        else {
            var display = document.createElement('div');
            display.id = "question";
            display.innerHTML = questionArray[y].getText() + "<br>";
            document.body.appendChild(display);
            display.style.display = "none";
        }

        for (var x = 0; x < questionArray[y].answers.length; x++) {
            if (currQ == 0) {
                console.log("made it into the inner loop");
                var label = document.createElement('label');
                var input = document.createElement('input');
                input.type = "radio";
                input.id = "input";
                input.className = "radio";

                label.innerHTML = "&nbsp;" + questionArray[y].answers[x] + "<br>";

                for (var z = 0; z < 5; z++) {
                    console.log("in the create element loop. Hope this works!");
                    var display = document.createElement('div');
                    display.id = "answer";
                }

                document.body.appendChild(input);
                document.body.appendChild(label);
            }
            else {
                console.log("made it into the inner loop");
                var label = document.createElement('label');
                var input = document.createElement('input');
                input.type = "radio";
                input.id = "input";
                input.className = "radio";

                label.innerHTML = "&nbsp;" + questionArray[y].answers[x] + "<br>";

                for (var z = 0; z < 5; z++) {
                    console.log("in the create element loop. Hope this works!");
                    var display = document.createElement('div');
                    display.id = "answer";
                }

                document.body.appendChild(input);
                document.body.appendChild(label);
                label.style.display = "none";
                input.style.display = "none";

            }
        }
        if(currQ == 0){
            var button = document.createElement('button');
            button.innerHTML = "Next Question";
            button.addEventListener('click', nextQuestion(y));
            document.body.appendChild(button);
        }
        else {
            var button = document.createElement('button');
            button.innerHTML = "Next Question";
            button.addEventListener('click', nextQuestion(y));
            document.body.appendChild(button);
            button.style.display = "none";
        }
        currQ++;
    }

}

function removeButton() {
    var button = document.getElementById("takeQuiz");
    button.parentNode.removeChild(button);
}

function nextQuestion() {
    //check what question we are on

    //check that their answer is correct
    checkAnswer();
    //display the next question
    console.log("This is interesting");
}

function checkAnswer() {
    //if answer is correct alert Good Job with an ok button
    //if answer is incorrect alert Try Again with an ok button
    /*
        if(document.getElementById("q1").value == "A"){
            document.getElementById("message1").innerHTML = "That is correct!";
        }
        else{
            document.getElementById("message1").innerHTML = "Incorrect! Try again.";
        }
    */
}