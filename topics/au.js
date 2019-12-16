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
localStorage.setItem("attempt_count", 0);
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
class Attempt {

    constructor(score, name) {
        this.score = score;
        this.name = name;
    }
    getScore() {
        return this.score;
    }
    //I don't think I need a setScore
    getName() {
        return this.name;
    }
    //Might not need a setName either but we will see

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

                nextQuestion(quiz, currQ);

            }
            else {
                // console.log("Error fetching quiz questions");
            }

        } else {
            // display.innerHTML = "Loading..."; maybe put an animation here?
        };
    }

}

function displayQuestions(quiz, y) {


    //create a new div element
    var displayQ = document.createElement('div');
    displayQ.id = "question" + y;
    addElement(displayQ, y);
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
    var parent = button.parentNode;
    button.parentNode.removeChild(button);
    if (id == "takeQuiz")
        parent.parentNode.removeChild(parent);
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

            }
            else {

                displayGrade(false);

            }
            break;
        }
        else {
            count++;
        }
    }
    if (count == radios.length) {
        //console.log("No choice was made");
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
                btn.className = "NextBtn";
                btn.title = "Next Question";
                btn.onclick = function () {
                    checkAnswer(quiz, y); setTimeout(function () {
                        removeElement(y); nextQuestion(quiz, ++y);
                    }, 1800);
                }
                // btn.addEventListener('mouseover', function () { displayHint1(); });

                let btnContainer = document.createElement('div');
                btnContainer.id = "forBtns";
                btnContainer.className = "QuizForm";
                document.body.appendChild(btnContainer);


                btnContainer.appendChild(btn);
            }
            else if (q.length > 0) {

                displayQuestions(quiz, ++y);
            }

            break;
        case 1:
            let element = document.getElementById("question0");
            element.addEventListener("animationend", function () {
                //remove the previous question

                let z = document.getElementById("question0");

                while (z.hasChildNodes()) {
                    z.removeChild(z.firstChild);
                }
                z.remove();


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


            });

            var button = document.createElement('button');
            button.innerHTML = "Submit";
            button.id = "submit";
            button.title = "Show your Score";
            button.className = "submitBtn";
            button.addEventListener('click', function () { removeElement(y); displayResult(y); });
            //button.addEventListener('mouseover', function () { displayHint2(); });
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


            });


            //display the next question
            displayQuestions(quiz, y);

            break;
    }


}

function removeElement(currQ) {
    var id = "question" + currQ;
    var element = document.getElementById(id);
    //  console.log("This is the currQ in removeElement: " + currQ);
    let remId = "remove" + currQ;
    // console.log("This is the remId in removeElement: " +remId);
    let add_id = "add" + currQ;
    // console.log("This is the add_id in removeElement: " + add_id);
    element.classList.add(remId);
    element.classList.remove(add_id);
    //element.addEventListener("animationend", function (id) { document.getElementById(id).remove(); console.log("the animation ended"); });
    //element.remove();
    let meme1 = document.getElementById("correct");
    meme1.style.display = "none";
    let meme2 = document.getElementById("incorrect");
    meme2.style.display = "none";

}
function addElement(id, currQ) {
    //let div = document.getElementById(id);
    //console.log("This is the currQ in addElement: " + currQ);
    let addId = "add" + currQ;
    id.classList.add(addId);
}
function displayResult(y) {
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

    //get their latest score
    var pscore = localStorage.getItem("quiz_score");

    //create a div to hold everything
    var div = document.createElement('div');
    div.id = "results";
    //div.className = "QuizForm";

    //create a div to hold the username form
    var username = document.createElement('div');
    username.id = "username";
    username.className = "username";
    var label = document.createElement('label');
    var input = document.createElement('input');

    //add text to label
    label.innerHTML = "&nbsp; Enter your name for the leaderboard:";

    //configure the input type and id
    input.type = "text";
    input.name = "username";
    input.id = "input_name";
    input.className = "text";

    //create a submit button for the leaderboard form
    var btn = document.createElement('button');
    btn.id = "submit_name";
    btn.innerHTML = "Submit";
    btn.type = "button";
    btn.addEventListener("click", function () {
        //show the leaderboard
        showLeaderBoard();
    });

    //append the input and label to the username div
    username.appendChild(label);
    username.appendChild(input);

    //create another div to show their score
    var t = document.createElement('div');
    t.className = "username";
    t.id="score";
    t.innerHTML = "<h1>Your Score is " + pscore + "</h1>";

    //append the submit button to the username form
    username.appendChild(btn);
    //append the score to the first div
    div.appendChild(t);
    //append the username form to the first div
    div.appendChild(username);

    //find the form in the DOM
    var form = document.getElementById("quiz");

    //append the first div to the form (for formatting)
    form.appendChild(div);

    //add animations
    addElement(div, y);


}
function showLeaderBoard() {
    //get what, if anything, is in localStorage right now (aka an array of attempts)
    let attempt_ar = JSON.parse(localStorage.getItem("attempt_arr"));
    var pscore = localStorage.getItem("quiz_score");
    let name = document.getElementById("input_name").value;

    if(attempt_ar == null){ 
        var attempt_arr = new Array();
        let attempt = new Attempt(pscore, name);
        attempt_arr.push(attempt);
        localStorage.setItem("attempt_arr", JSON.stringify(attempt_arr));
    }
    else {
        let new_attempt =  new Attempt(pscore, name);
        attempt_ar.push(new_attempt);
        localStorage.setItem("attempt_arr", JSON.stringify(attempt_ar));
    }
 
    //remove the username form
    var form = document.getElementById("username");
    form.parentNode.removeChild(form);
    
    //create the leaderboard table
    let div = document.createElement('div');
    div.className = "QuizForm";
    let table = document.createElement('table');
    table.className = "leaderboard";
    let row = document.createElement('tr');
    let header_name = document.createElement('th');
    let header_score = document.createElement('th');

    header_name.innerText = "Name";
    header_score.innerText = "Score";

    row.appendChild(header_name);
    row.appendChild(header_score);
    table.appendChild(row);
    div.appendChild(table);
    var count = JSON.parse(localStorage.getItem("attempt_arr"));
    
    //display the leaderboard
    for (let i = 0; i < count.length; i++) {

        let row_1 = document.createElement('tr');
        let name = document.createElement('td');
        let score = document.createElement('td');

        name.innerText = count[i].name;
        score.innerText = count[i].score;

        row_1.appendChild(name);
        row_1.appendChild(score);
        table.appendChild(row_1);
    }

    //add a retake button
    var btn = document.createElement('button');
    btn.className = "submitBtn";
    btn.innerText = "Take Again";
    btn.id="takeQuiz";
    btn.addEventListener("click", function () {
        //remove the score
        var elem = document.getElementById("score");
        elem.parentNode.removeChild(elem);
        //elem.classList.add("remove4");
        //start the quiz over again
        buildQuiz();
    });
    
    document.body.appendChild(div);
    document.body.appendChild(btn);

}

function displayGrade(correct) {
    if (correct) {
        //  console.log("Correct:");
        //  console.log(correct);
        //document.body.style.backgroundColor = "green";
        let meme1 = document.getElementById("correct");
        meme1.style.display = "block";
    }
    else {
        //   console.log("Incorrect:");
        //   console.log(correct);
        //document.body.style.backgroundColor = "red";
        let meme2 = document.getElementById("incorrect");
        //   console.log("meme2 = " + meme2);
        //   console.log("meme2:display: " + meme2.style.display)
        meme2.style.display = "block";
        //   console.log("meme2:display after change: " + meme2.style.display)
    }
}

function go() {
    ashton.classList.add("clicked");
    setTimeout(function () {
        ashton.classList.remove("clicked");
    }, 2500);
}
/*
function displayHint1() {
    let hint1 = document.getElementById("hint1");
    hint1.title = "Next Question";
   /* if (hint1.style.display == "none") {

        hint1.style.display = "block";
    }
    else {
        hint1.style.display = "none";
    }


}
function displayHint2() {
    let hint2 = document.getElementById("hint2");


    if (hint2.style.display == "none") {
        hint2.style.display = "block";
    }
    else {
        hint2.style.display = "none";
    }
}
*/
