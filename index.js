//creo "myform" para luego usar el evento "submit"
const myform = document.getElementById("myform");
let correct = [];
let numQuestions = 0;
//FASE 2 - RESPUESTAS ALEATORIAS + SPA + FIREBASE!!!!
//algoritmo Fisher-Yates para desordenar el array de respuestas
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then(res=>res.json())
    .then(data=> {
        data.results.forEach((element, i)=> {
            numQuestions++;
            let answers = [];
            correct.push(element.correct_answer);
            answers.push(element.correct_answer);
            element.incorrect_answers.forEach(item=> {
                answers.push(item);
            })
            shuffle(answers);
            console.log(correct);
            console.log(answers);
            const fieldset = document.createElement("div");
            fieldset.innerHTML = `<fieldset id="fieldset${i + 1}">
                <div class="dlegend">
                    <legend>${element.question}</legend>
                </div>
                <div class="a">
                    <input type="radio" name="answer${i + 1}" id="${answers[0]}">
                    <label for="${answers[0]}">${answers[0]}</label>
                </div>
                <div class="b">
                    <input type="radio" name="answer${i + 1}" id="${answers[1]}">
                    <label for="${answers[1]}">${answers[1]}</label>
                </div>
                <div class="c">
                    <input type="radio" name="answer${i + 1}" id="${answers[2]}">
                    <label for="${answers[2]}">${answers[2]}</label>
                </div>
                <div class="d">
                    <input type="radio" name="answer${i + 1}" id="${answers[3]}">
                    <label for="${answers[3]}">${answers[3]}</label>
                </div>
            </fieldset>`;
            myform.appendChild(fieldset);
        });
        validation(correct);
        const divBtn = document.createElement("div");
        divBtn.innerHTML = `<div id="dbtn">                
            <div class="dlegend">
                <h2>Press the button to know how many answers you have got right</h2>
            </div>
            <button type="submit" id="btn">Resolver</button>
        </div>`;
        myform.appendChild(divBtn);
    })

//VARIABLES
const inputs = document.querySelectorAll("input");
const fieldsets = document.getElementsByTagName("fieldset");

//VALIDAR RESPUESTAS
function validation(correct) {
    myform.addEventListener("submit", function(event) {
        event.preventDefault();
        //Primero nos aseguramos de que responda todas las preguntas
        const checked = document.querySelectorAll("input:checked");
        //declaro un sumatorio para registrar cuantas respuestas se han acertado
        let sumCorrect = 0;
        //si hay menos fieldsets cubiertos que preguntas muestra alerta
        if (checked.length < fieldsets.length) {
            //muestro alerta con "SweetAlert"
            Swal.fire({
                title: 'Calm down',
                text: 'You have to answer all the questions',
                icon: 'info',
                confirmButtonText: 'Cool',
                color: '#ff6d48',
                background: '#adf8ef',
                confirmButtonColor: '#275060'
            })
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
                    sumCorrect++;
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
            //muestro las respuestas acertadas 
            const intro = document.getElementById("intro");
            const result = document.createElement("div");
            result.innerHTML = `<div id="result">
                                    <h2>Aciertos: ${sumCorrect} / ${numQuestions}</h2>
                                    <h2></h2>
                                    <button id="again">Otra vez</button>
                                </div>`;
            intro.appendChild(result);
            //vuelvo a la pantalla de inicio
            window.scroll({
                top: 0,
                behavior: "smooth"
            })
            //bloqueo los input para que no se puedan seguir seleccionando
            inputs.forEach(element=>element.setAttribute("disabled", "disabled"));
            //RECARGAR PÁGINA CON BOTÓN "OTRA VEZ"
            const btnAgain = document.getElementById("again");
            btnAgain.addEventListener("click", function(event) {
                event.preventDefault();
                location.reload();
            })
        }
    })
}


