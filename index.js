//VARIABLES
//creo "myform" para luego usar el evento "submit"
const myform = document.getElementById("myform");
//array con las respuestas correctas
const correct = ['cocodrilo', 'windsor', 'seis', 'clon', 'urano', 'amazonas', 'freud', '969', 'd', 'gotico'];
const inputs = document.querySelectorAll("input");


//VALIDAR RESPUESTAS
myform.addEventListener("submit", function(event) {
    event.preventDefault();
    //Primero nos aseguramos de que responda todas las preguntas
    //Sabemos el número de fieldsets
    const fieldsets = document.getElementsByTagName("fieldset");
    //Sabemos también el número fildsets cubiertos
    const checked = document.querySelectorAll("input:checked");
    if (checked.length < fieldsets.length) {
        alert("Debes responder a todas las preguntas")
    } else {
        for (let i = 0; i < fieldsets.length; i++) {
            const answer = document.querySelector(`#fieldset${i + 1} input:checked`);
            const answerNodes = document.querySelector(`#fieldset${i + 1} input:checked + label`);
            console.log(answer);
            if (answer.id === correct[i]) {
                answer.checked = false;
                answerNodes.classList.add("correct");
                console.log(answerNodes);
            } else {
                answer.checked = false;
                answerNodes.classList.add("wrong");
            }
        }
    }


})