const questions=[
    {
        question: "HTML stands for?",
        answers:[
            {text:"Hyper text Makeup Language",correct:false},
            {text:"Hyper text Markup Language",correct:true},
            {text:"Hyper transfer Makeup Language",correct:false},
            {text:"Hyper text Model Language",correct:false},
        ]
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        answers:[
            {text:"background-color",correct:true},
            {text:"color",correct:false},
            {text:"border-color",correct:false},
            {text:"text-color",correct:false},
        ]
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        answers:[
            {text:"var",correct:false},
            {text:"let",correct:false},
            {text:"const",correct:false},
            {text:"All of the above",correct:true},
        ]
    },
    {
        question: "What is the purpose of the DOCTYPE declaration in an HTML document?",
        answers:[
            {text:"It defines the type of document and version of HTML.",correct:true},
            {text:"It specifies the language of the document.",correct:false},
            {text:"It links to external stylesheets.",correct:false},
            {text:" It is used to load external scripts.",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();