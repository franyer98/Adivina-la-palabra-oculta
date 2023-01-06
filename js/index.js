// estructura que mantiene las palabras del juego

let bd = new Array(4);
bd[0] = [
  "pera",
  "banana", 
  "melon",
  "sandia",
  "mandarina",
  "kiwi", 
  "fresa",
  "7",
  "6", 
  "5",
  "4",
  "3",
  "2", 
  "1"



];
bd[1] = [
  "piano",
  "guitarra",
  "violin",
  "bajo",
  "trompeta",
  "saxofon",
  "bateria",
];
bd[2] = [
  "leon",
  "gallina",
  "perro",
  "tigre",
  "pato",
  "mono",
  "jirafa",
];
bd[3] = [
  "argentina",
  "peru",
  "chile",
  "colombia",
  "españa",
  "mexico",
  "ecuador",
];

//CATEGORIAS
let categorias = ["FRUTAS", "MUSICA", "ANIMALES", "PAISES"];

//CANTIDAD DE PALABRAS CON LAS QUE SE JUGARA CADA CATEGORIA
const cantidadPalabras = 5;

//este arreglo guarda la5 palabras para jugar
let palabras = [];

//este arreglo guarda las palabras desordenadas del arreglo
let desordenadas = [];

//mantengo el nivel actual
let pos = 0;

//tomo una categoria y seleeciono 5 palabras ramdom para jugar
function agregarPalabra(categoria) {
  for (i = 0; i < cantidadPalabras; i++) {
    let x = Math.floor(Math.random() * categoria.length);
    palabras.push(categoria[x]);
    //elimino del arreglo categoria para que la proxima vez ya no este para elegir
    categoria.splice(x, 1);
  }
}

//la primera vez le envio la categoria frutas
agregarPalabra(bd[pos]);

//funcion para desordenar las palabras, quedaran guardadas en el arreglo desordenadas
function desordenarPalabras() {
  for (i = 0; i < palabras.length; i++) {
    //convertimos en un arreglo
    let palabra = palabras[i];
    palabra = palabra.split("");

    let palabraDesordenada;
    palabraDesordenada = palabra.sort(function () {
      return Math.random() - 0.5;
    });

    //convertimos el arreglo a string (ya que nos quedo letra y coma)
    palabraDesordenada = palabraDesordenada.toString();

    //quitamos las comas
    palabraDesordenada = palabraDesordenada.replace(/,/g, "");

    //controlamos que la palabra desordenada no haya quedado igual que la ordenada
    if (palabraDesordenada == palabra[i]) {
      i = i - 1;
    } else {
      //guardamos la palabra desordenada
      desordenadas.push(palabraDesordenada);
    }
  }
}

//funcion para agregar la palabra y el input
function agregarPalabras() {
  //agregamos el titulo
  let h2 = document.createElement("h2");
  h2.textContent = categorias[pos];
  document.querySelector("#container").appendChild(h2);
  for (var i = 0; i < desordenadas.length; i++) {
    let div = document.createElement("div");
    div.className = "fila";
    let palabra = document.createElement("div");
    palabra.textContent = desordenadas[i];
    palabra.className = "palabra";
    div.appendChild(palabra);
    let input = document.createElement("input");
    input.id = i;

    //al input le agrego el evento onkeyut para dectectar cuando se presiona una tecla

    input.setAttribute("onkeyup", "corregir(" + i + ")");
    div.appendChild(input);
    document.querySelector("#container").appendChild(div);
  }
}

desordenarPalabras();
agregarPalabras();

//funcion para corregir la palabra hasta el momento ingresada
function corregir(i) {
  p = document.getElementById(i).value;
  //caso que no haya ingresado nada
  if (p == "") {
    return;
  }
  if (p == palabras[i]) {
    //caso que coincida
    document.getElementById(i).className = "correcta";

    //controlamos si termino
    controlFin();
  } else {
    document.getElementById(i).className = "";
  }
}

let btnCreado = false;
function controlFin() {
  let total = document.getElementsByClassName("correcta").length;
  if (total == cantidadPalabras && btnCreado == false) {
    // se completaron las palabras
    let button = document.createElement("button");
    button.textContent = "Siguiente";
    button.setAttribute("onclick", "siguiente()");
    document.querySelector("#container").appendChild(button);
    btnCreado = true;

    //desbloqueamos el nivel
    let niveles = document.getElementsByClassName("nivel");
    niveles[pos].classList = "nivel completado";
  }
}

function siguiente() {
  //asi limpio el arreglo palabras, para cargar las nuevas palabras
  palabras.length = 0;
  desordenadas.length = 0;
  document.querySelector("#container").textContent = "";
  pos++;
  //controlo si le termino el juego
  if (pos < bd.length) {
    //no termino
    btnCreado = false;
    agregarPalabra(bd[pos]);
    desordenarPalabras();
    agregarPalabras();
  } else {
    //termino

    let h2 = document.createElement("h2");
    h2.textContent = "JUEGO FINALIZADO, BIEN HECH0!";
    document.querySelector("#container").appendChild(h2);

    //agregando imagen al DOM
    let img = document.createElement("img");
    img.src = "./img/descarga.png";
    document.querySelector("#container").appendChild(img);

    //quitando h1 a la parte final
    document.getElementById("h1").style.display = "none";
  }
}
