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

        for (let i = 0; i < 4; i++) {
            if (i == 3) {
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
    getCorrectAnswer() {
        return this.correct_answer;
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

                //remove the 'Take Quiz' Button
                removeButton("takeQuiz");
                //display the quiz
                console.log("This is just before calling nextQ in buildQuiz()");
                console.log(quiz);
                nextQuestion(quiz, currQ);

            }
            else {
                console.log("Error fetching quiz questions");
            }

        } else {
            // display.innerHTML = "Loading..."; maybe put an animation here?
        };
    }

}

function displayQuestions(quiz, y) {
    console.log("This is quiz in displayQuestions");
    console.log(quiz);

    //create a new div element
    var displayQ = document.createElement('div');
    displayQ.id = "question" + y;
    addElement(displayQ);
    var t = document.createElement('div');
    t.innerHTML = quiz[y].getText();

    displayQ.appendChild(t);
    var html = document.getElementById("quiz");
    html.appendChild(displayQ);


    //extract the array with answer choices
    let choices = quiz[y].getAnswers();

    for (let i = 0; i < choices.length; i++) {

        //create the answer div, input, and label elements
        var display = document.createElement('div');
        display.id = "answer" + i;
        var label = document.createElement('label');
        var input = document.createElement('input');

        //add text to label
        label.innerHTML = "&nbsp;" + choices[i];

        //configure the input type and id
        input.type = "radio";
        input.name = "answer";
        input.id = "input" + i;
        input.className = "radio";
        input.value = choices[i];

        //append the input and label to the answer div and then the answer div to the question div
        display.appendChild(input);
        display.appendChild(label);
        displayQ.appendChild(display);

    }

}

function removeButton(id) {
    var button = document.getElementById(id);
    button.parentNode.removeChild(button);
}
function checkAnswer(quiz, y) {
    //get user input
    var radios = document.getElementsByName("answer");
    let key = quiz[y].getCorrectAnswer();
    let count = 0;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            let input = radios[i].value;
            //check against correct answer for each Q
            if (input == key) {

                var pscore = localStorage.getItem("quiz_score");
                var value = JSON.parse(pscore);
                value = value + 5;
                localStorage.quiz_score = value;


                displayGrade(true);
                /*
                                var message = document.getElementById("modal-text");
                                var modal = document.getElementById("myModal");
                
                                
                                message.innerHTML = "<h1>That is Correct!</h1>";
                                modal.style.display = "block";
                                
                
                                // When the user clicks on <span> (x), close the modal
                                var span = document.getElementsByClassName("close")[0];
                                span.onclick = function () {
                                    modal.style.display = "none";
                                }
                
                                // When the user clicks anywhere outside of the modal, close it
                                window.onclick = function (event) {
                                    if (event.target == modal) {
                                        modal.style.display = "none";
                                    }
                                }
                                */
            }
            else { 

                displayGrade(false);
                /*
                var message = document.getElementById("modal-text");
                
                var modal = document.getElementById("myModal");

                
                message.innerHTML = "<h1>That is Incorrect.</h1>";
                modal.style.display = "block";
                

                // When the user clicks on <span> (x), close the modal
                var span = document.getElementsByClassName("close")[0];
                span.onclick = function () {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }*/
            }
            // only one radio can be logically checked, don't check the rest
            break;
        }
        else {
            count++;
        }
    }
    if (count == radios.length) {
        console.log("No choice was made");
    }

}

function nextQuestion(quiz, y) {
    // console.log("This is quiz in nextQuestion before the switch case");
    //console.log(quiz);

    switch (y) {

        case 0:
            //display the question and button
            //      console.log("This is quiz in case 0 of the switch case in nextQuestion");
            //    console.log(quiz);
            localStorage.setItem("quiz_score", 0);
            let q = document.getElementById("question0");
            if (q == null) {
                //      console.log("This is quiz when question0 is null(it's the first question to be displayed");
                //    console.log(quiz);
                //display the question
                displayQuestions(quiz, y);

                //display the buttons
                let btn = document.createElement('button');
                btn.id = "btn1";
                btn.innerText = "Next";
                btn.className = "btnPlace";
                btn.onclick = function () { checkAnswer(quiz, y); removeElement(y); nextQuestion(quiz, ++y); }


                let btnContainer = document.createElement('div');
                btnContainer.id = "forBtns";
                document.body.appendChild(btnContainer);


                btnContainer.appendChild(btn);
            }
            else if (q.length > 0) {
                console.log("we found a prev question");
                console.log(q);

                displayQuestions(quiz, ++y);
            }

            break;
        case 1:
                let element = document.getElementById("question0");
            element.addEventListener("animationend", function () {
                //remove the previous question
                console.log("This is when y = 1 in nextQuestions()");
                let z = document.getElementById("question0");

                while (z.hasChildNodes()) {
                    console.log("This means that the element with the id question0 has childNodes");
                    z.removeChild(z.firstChild);
                }
                z.remove();


                console.log("the animation ended in case 1");

            });

            //display the next question
            displayQuestions(quiz, y);

            break;
        case 9:
                let elem = document.getElementById("question8");
            elem.addEventListener("animationend", function () {
                //remove the previous question
                let a = document.getElementById("question8");

                while (a.hasChildNodes()) {
                    // console.log("This means that the element with the id question0 has childNodes");
                    a.removeChild(a.firstChild);
                }
                a.remove();

                //remove the 'next' btn
                let btn = document.getElementById("btn1");
                removeButton(btn.id);

                console.log("the animation ended in case 9");

            });

            var button = document.createElement('button');
            button.innerHTML = "Submit";
            button.id = "submit";
            button.className = "btnPlace";
            button.addEventListener('click', function () { removeElement(y); displayResult(); });
            let btnContainer = document.getElementById("forBtns");

            btnContainer.appendChild(button);
            //display the next question
            //button.addEventListener("animationend", function () {
            displayQuestions(quiz, y);
            //});
            break;
        default:
                let c = y - 1;
                let id = "question" + c;
                let b = document.getElementById(id);
            //remove the previous question
            b.addEventListener("animationend", function (b) {
                let d = document.getElementById(id);
                while (d.hasChildNodes()) {
                    // console.log("This means that the element with the id question0 has childNodes");
                    d.removeChild(d.firstChild);
                } 
                d.remove();

                console.log("the animation ended in default");

            });


            //display the next question
            displayQuestions(quiz, y);

            break;
    }


}

function removeElement(currQ) {
    var id = "question" + currQ;
    var element = document.getElementById(id);
    element.classList.add("remove1");
    element.classList.remove("add1");
    //element.addEventListener("animationend", function (id) { document.getElementById(id).remove(); console.log("the animation ended"); });
    //element.remove();
    console.log("RemoveElement got called for:");
    console.log(id);

}
function addElement(id){
    //let div = document.getElementById(id);
    id.classList.add("add1");
}
function displayResult() {
    let elem = document.getElementById("question9");
    elem.addEventListener("animationend", function () {
        //remove the previous question
        let a = document.getElementById("question9");

        while (a.hasChildNodes()) {
            // console.log("This means that the element with the id question0 has childNodes");
            a.removeChild(a.firstChild);
        }
        a.remove();

        //remove the 'next' btn
        let btn = document.getElementById("submit");
        removeButton(btn.id);
    });
    var pscore = localStorage.getItem("quiz_score");
    var div = document.createElement('div');
    div.id = "results";
    
    var t = document.createElement('div');
    t.innerHTML = "<h1>" + pscore + "</h1>";

    div.appendChild(t);
    document.body.appendChild(div);
    addElement(div);
}

function removeBackground() {
    document.body.style.backgroundColor = "#fefefe";
}
function displayGrade(correct) {
    if (correct) {
        document.body.style.backgroundColor = "green";
    }
    else {
        document.body.style.backgroundColor = "red";
    }
}

function go() {
    ashton.classList.add("clicked");
    setTimeout(function () {
        ashton.classList.remove("clicked");
    }, 2500);
}