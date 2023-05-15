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
    //si hay menos fieldsets cubiertos que preguntas muestra alerta
    if (checked.length < fieldsets.length) {
        alert("Debes responder a todas las preguntas")
        //si todos los fildsets han sido cubiertos continúa
    } else {
        //recorro todos los fielsets
        for (let i = 0; i < fieldsets.length; i++) {
            //almaceno el input seleccionado
            const answer = document.querySelector(`#fieldset${i + 1} input:checked`);
            //almaceno el div padre
            const answerNodes = document.querySelector(`#fieldset${i + 1} input:checked + label`);
            //almaceno el div donde está legend para luego añadir el mensaje
            const legend = document.querySelector(`#fieldset${i + 1} .dlegend`)
            //creo el mensaje vacío
            const message = document.createElement("h5");
            if (answer.id === correct[i]) {
                //desmarco la opción
                answer.checked = false;
                //añado la clase "correct" al div padre
                answerNodes.classList.add("correct");
                //añado contenido al mensaje
                message.innerText = "La respuesta es correcta";
                message.classList.add("correct-message");
                legend.appendChild(message);
            } else {
                //desmarco la opción
                answer.checked = false;
                //añado la clase wrong al div padre
                answerNodes.classList.add("wrong");
                //añado contenido al mensaje
                message.innerText = "La respuesta no es correcta";
                message.classList.add("wrong-message");
                legend.appendChild(message);
            }
        }
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }


})