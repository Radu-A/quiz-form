const myform = document.getElementById("myform");
const correct = ['cocodrilo', 'windsor'];

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
            let answer = document.querySelector(`#fieldset${i + 1} input:checked`);
            let answerNodes = document.querySelector(`#fieldset${i + 1} input:checked + label`);
            console.log(answer);
            if (answer.id === correct[i]) {
                answerNodes.classList.add("correct");
                console.log(answerNodes);
            } else {
                answerNodes.classList.add("wrong");
            }
        }
    }


})