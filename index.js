function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

let preguntas_hechas = 0;
let preguntas_correctas = 0;
let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;
let basePreguntas = readText("preguntas.json")
let interpretep = JSON.parse(basePreguntas)
let pregunta
let npreguntas = [];
let btns = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
]
let btnCorrespondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")

]

function seleccionarPregunta(n){
    
    pregunta = interpretep[n]
    select_id("categoria").innerHTML = pregunta.categoria
    select_id("pregunta").innerHTML = pregunta.pregunta
    
    
} 

function preguntaAleatoria(){
    let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interpretep.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interpretep.length) {
      n = 0;
    }
    if (npreguntas.length == interpretep.length) {
      
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
          icon: "success"
        });
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  seleccionarPregunta(n);
}
preguntaAleatoria()

let arrayPreguntas = []
function randomPreguntas(){
    arrayPreguntas = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2, pregunta.incorrecta3]
    arrayPreguntas.sort(()=>Math.random()-0.5)
    select_id("btn1").innerHTML = arrayPreguntas[0]
    select_id("btn2").innerHTML = arrayPreguntas[1]
    select_id("btn3").innerHTML = arrayPreguntas[2]
    select_id("btn4").innerHTML = arrayPreguntas[3]
}

randomPreguntas()

function oprimirBtn(i){
    if(arrayPreguntas[i] == pregunta.respuesta){
        btnCorrespondiente[i].style.background = "green"
    }
    else{
        btnCorrespondiente[i].style.background = "red"
    }
    setTimeout(() => {
        reiniciar()
    }, 3000);
}

function reiniciar(){
    for(const btn of btnCorrespondiente){
        btn.style.background = "white"
    }
    preguntaAleatoria()
    randomPreguntas()
}



