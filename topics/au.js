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

    constructor(question, correct_answer, incorrect_answers) {
        this.question = question;
        this.correct_answer = correct_answer;
        this.score = 5;
        this.incorrect_answers = incorrect_answers;
    }
    getText() {
        return this.question;
    }
    getAnswers() {
        let choices = new Array();

        for(let i = 0; i < 4; i++){
            if(i == 3) {
                choices[i] = this.correct_answer;
            }
            else {
                choices[i] = this.incorrect_answers[i];
            }
            
        }
        
        return choices;
    }
    getScore() {
        return this.score;
    }

}



function buildQuiz() {
    //AJAX to get json file for quiz questions

    var display = document.getElementById("quiz");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://opentdb.com/api.php?amount=10&type=multiple");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // var question = new Question();
            var obj = JSON.parse(this.responseText);//this will return 10 questions in JSON format

            if (obj.response_code == 0) {
                var q1 = Object.assign(new Question(obj.results[0].question, obj.results[0].correct_answer, obj.results[0].incorrect_answers), obj.results[0]);
                var q2 = Object.assign(new Question(obj.results[1].question, obj.results[1].correct_answer, obj.results[1].incorrect_answers), obj.results[1]);
                var q3 = Object.assign(new Question(obj.results[2].question, obj.results[2].correct_answer, obj.results[2].incorrect_answers), obj.results[2]);
                var q4 = Object.assign(new Question(obj.results[3].question, obj.results[3].correct_answer, obj.results[3].incorrect_answers), obj.results[3]);
                var q5 = Object.assign(new Question(obj.results[4].question, obj.results[4].correct_answer, obj.results[4].incorrect_answers), obj.results[4]);
                var q6 = Object.assign(new Question(obj.results[5].question, obj.results[5].correct_answer, obj.results[5].incorrect_answers), obj.results[5]);
                var q7 = Object.assign(new Question(obj.results[6].question, obj.results[6].correct_answer, obj.results[6].incorrect_answers), obj.results[6]);
                var q8 = Object.assign(new Question(obj.results[7].question, obj.results[7].correct_answer, obj.results[7].incorrect_answers), obj.results[7]);
                var q9 = Object.assign(new Question(obj.results[8].question, obj.results[8].correct_answer, obj.results[8].incorrect_answers), obj.results[8]);
                var q10 = Object.assign(new Question(obj.results[9].question, obj.results[9].correct_answer, obj.results[9].incorrect_answers), obj.results[9]);

                var quiz = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
                var currQ = 0;

                removeButton();
                //console.log(quiz[0]);
                displayQuestions(quiz, currQ);
                
                
            }
            else {
                console.log("Error fetching quiz questions");
            }

        } else {
            // display.innerHTML = "Loading..."; maybe put an animation here?
        };
    }

}
function displayQuestions(quiz, currQ) {

    for (var y = 0; y < quiz.length; y++) {

            var displayQ = document.createElement('div');
            displayQ.id = "question" + y;
            
            
            let choices = quiz[y].getAnswers();           
           
            displayQ.innerHTML = quiz[y].getText();
            document.body.appendChild(displayQ);
            
            for(let i = 0; i < choices.length; i++){
                
                var display = document.createElement('div');
                display.id = "answer" + i;
                var label = document.createElement('label');
                var input = document.createElement('input');
                
                
                label.innerHTML = "&nbsp;" + choices[i];

                input.type = "radio";
                input.id = "input" + i;
                input.className = "radio";

                display.appendChild(input);
                display.appendChild(label);
                
    
                document.body.appendChild(display);
                
                currQ++;
          
        }

    }
    var button = document.createElement('button');
    button.innerHTML = "Submit";
    button.id = "submit";
    button.addEventListener('click', function () { checkAnswer(quiz); });
    document.body.appendChild(button);
}

function removeButton() {
    var button = document.getElementById("takeQuiz");
    button.parentNode.removeChild(button);
}
function checkAnswer(quiz) {
    //get user input
    //check against correct answer for each Q
    
}

/*function nextQuestion(y) {

    //d


    //check that their answer is correct
    checkAnswer();
    //display the next question
    id = "question" + y;
    
    switch (y) {
        case 1:
            //remove the previous question
            document.getElementById("question0").style.display = "none";
            document.getElementById("input0").style.display = "none";
            document.getElementById("input1").style.display = "none";
           // document.getElementById("input2").style.display = "none";
           // document.getElementById("input3").style.display = "none";
            //remove the previous button
            document.getElementById('btn1').style.display = "none";

            //display the next question and button
            document.getElementById(id).style.display = "block";
            document.getElementById("input0").style.display = "block";
            document.getElementById("input1").style.display = "block";
            document.getElementById("input2").style.display = "block";
            document.getElementById("input3").style.display = "block";

            document.getElementById('btn1').style.display = "block";
            //subtract from y
            y--;
            break;
        case 2:
            //remove the previous question
            document.getElementById("question1").style.display = "none";
            document.getElementById("input0").style.display = "none";
            document.getElementById("input1").style.display = "none";
            document.getElementById("input2").style.display = "none";
            document.getElementById("input3").style.display = "none";
            //remove the previous button
            document.getElementById('btn1').style.display = "none";
            //display the next question and button
            document.getElementById(id).style.display = "block";
            document.getElementById("input0").style.display = "block";
            document.getElementById("input1").style.display = "block";
            document.getElementById("input2").style.display = "block";
            document.getElementById("input3").style.display = "block";

            document.getElementById('btn2').style.display = "block";
            //subtract from y
            y--;
            break;
        case 3:
            //remove the previous question
            document.getElementById("question2").style.display = "none";
            document.getElementById("input0").style.display = "none";
            document.getElementById("input1").style.display = "none";
            document.getElementById("input2").style.display = "none";
            document.getElementById("input3").style.display = "none";
            //remove the previous button
            document.getElementById('btn1').style.display = "none";
            //display the next question and button
            document.getElementById(id).style.display = "block";
            document.getElementById("input0").style.display = "block";
            document.getElementById("input1").style.display = "block";

            document.getElementById('btn2').style.display = "block";
            //subtract from y
            y--;
            break;
        case 4:
            //remove the previous question
            document.getElementById("question3").style.display = "none";
            document.getElementById("input0").style.display = "none";
            document.getElementById("input1").style.display = "none";
            document.getElementById("input2").style.display = "none";
            document.getElementById("input3").style.display = "none";
            //remove the previous button
            document.getElementById('btn1').style.display = "none";
            //display the next question and button
            document.getElementById(id).style.display = "block";
            document.getElementById("input0").style.display = "block";
            document.getElementById("input1").style.display = "block";
            document.getElementById("input2").style.display = "block";
            document.getElementById("input3").style.display = "block";

            document.getElementById('btn2').style.display = "block";
            //subtract from y
            y--;
            break;

        default:
        // code block
    }


}
*/


function go() {
    ashton.classList.add("clicked");
    setTimeout(function () {
        ashton.classList.remove("clicked");
    }, 2500);
}