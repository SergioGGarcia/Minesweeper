let estado = true; // Variable que usaremos para ver si el juego esta empezado o a terminado

// Función que crea un tablero 10x10 y lo llena con 0 en todas sus posiciones
function crearTablero() {
    const tablero = [];

    // Se recorren las filas del tablero hasta 10
    for (let i = 0; i < 10; i++) {

        tablero.push([]); // Se añade una fila

        // Se recorren las columnas hasta 10
        for (let j = 0; j < 10; j++) {
            tablero[i].push(0); // Llena la posición con un 0
        }
    }
    return tablero;
}

// Función que pondra 10 minas aleatoriamente
function ponerMinas(tablero) {
    let cont = 0;   // Contador que llevara la cuenta de las minas

    do {

        const fila = Math.floor(Math.random() * 10);    // Escoge una fila aleatoria
        const columna = Math.floor(Math.random() * 10); // Escoge una columna aleatoria

        // Si la casilla escogida es 0 entonces se pone la bomba
        if (tablero[fila][columna] == 0) {
            tablero[fila][columna] = "b";
            cont++; // Sumamos la bomba que hemos puesto
        }

    } while (cont < 10);
}

// Función que va contar las minas adyacentes que tiene una casilla cuando pulsemos una casilla
function contarMinasAdyacentes(tablero, fila, columna) {
    let total = 0;

    // Nos posicionamos en una posicion adyacente
    if (fila - 1 >= 0 && columna >= 0) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila - 1][columna - 1] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (fila - 1 >= 0) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila - 1][columna] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (fila - 1 >= 0 && columna + 1 < 10) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila - 1][columna + 1] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (columna + 1 < 10) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila][columna + 1] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (fila + 1 < 10 && columna + 1 < 10) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila + 1][columna + 1] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (fila + 1 < 10) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila + 1][columna] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (fila + 1 < 10 && columna - 1 >= 0) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila + 1][columna - 1] == "b") {
            total = total + 1;
        }
    }

    // Nos posicionamos en una posicion adyacente
    if (columna - 1 >= 0) {
        // Comprobamos si la posición tiene mina
        if (tablero[fila][columna - 1] == "b") {
            total = total + 1;
        }
    }
    return total;
}

// Función que pondrá las minas adyacentes que hay en cada casilla llamando a la función contarMinasAdyacentes
function ponerMinasAdyacentes(tablero) {

    // Se recorren las filas del tablero
    for (let i = 0; i < 10; i++) {
        // Se recorren las columnas del tablero
        for (let j = 0; j < 10; j++) {
            // Si la casilla tiene 0 quiere decir que no hay mina
            if (tablero[i][j] == 0) {
                // Llamamos a la función para que cuente cuantas minas adyacentes tiene y lo escriba
                tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
            }
        }
    }

}

// Función para mostrar el tablero en la página
function mostrarTablero() {
    let html = "";  // Cadena que llenaremos luego con cada casilla

    // Recorremos cada fila
    for (let i = 0; i < 10; i++) {
        // Recorremos cada columna
        for (let j = 0; j < 10; j++) {
            // Sumamos a html el span de la nueva casilla
            html += "<span class='celda gris' id='celda" + i + "" + j + "' data-fila='" + i + "' data-columna='" + j + "'></span>";
        }
    }

    // Escribimos en el html el tablero ya formado
    //document.querySelector(".container").innerHTML = html;
    document.getElementById("container").innerHTML = html;
}

// Función que sera llamada cuando se haga click en una casilla para destaparla
function destapar(tablero, fila, columna, evento) {

    // Si hay bomba
    if (tablero[fila][columna] == "b") {

        evento.target.style.backgroundColor = "red"; // Se cambia el fondo a rojo
        document.getElementById("texto_perder").innerHTML = "Oohh encontraste una mina, has perdido"; // Mensaje de que has perdido
        evento.target.textContent = "💣";
        estado = false; // Indicamos que la partida ha terminado

    } else {

        // Miramos si en la casilla no hay 0
        if (tablero[fila][columna] >= 1 && tablero[fila][columna] <= 8) {
            evento.target.textContent = tablero[fila][columna]; // Se escribe las minas adyacentes que hay en esa casilla
            evento.target.classList.add("verde");   // Se pone el fondo verde
            evento.target.classList.remove("gris"); // Se quita el fondo gris
        } else {

            // Si la casilla es 0 llamamos a la función recorrer que destapará todas las casillas adyacentes que tengan 0
            recorrer(tablero, fila, columna);
        }
    }

    // Llamaremos a la función ganar() para ver si ha ganado o todavia no
    ganar();
}

// Función que será llamada cuando se gane
function ganar() {
    // Contamos todos los span que hay seleccionando todos los span que hay con la función querySelectorAll
    const casillas = document.querySelectorAll(".container span");
    let cont = 0;

    // Recorremos todas las casillas
    casillas.forEach(casillas => {
        // Contamos todas las casillas verdes
        if (casillas.classList.contains("verde")) {
            cont++;
        }
    })

    // Si hay 90 casillas verdes entonces ha ganado
    if (cont == 90) {
        estado = false; // Indicamos que la partida ha terminado
        document.getElementById("texto_ganar").innerHTML = "Enhorabuena, has ganado la partida!!"; // Mensaje de que has ganado
    }
}

// Función que va destapando las casillas que tengan 0 hasta que vea una casilla distinta a 0
function recorrer(tablero, fila, columna) {

    // Verificamos que no nos salimos del tablero
    if (fila >= 0 && fila < 10 && columna >= 0 && columna < 10) {
        // Miramos si la casilla tiene 0
        if (tablero[fila][columna] == 0) {

            tablero[fila][columna] = "x"    // Cambiamos el valor a x para que cuando llame a la función recursivamente no de error

            document.getElementById("celda" + fila + "" + columna).classList.add("verde");   // Se pone el fondo verde
            document.getElementById("celda" + fila + "" + columna).classList.remove("gris"); // Se quita el fondo gris

            // Vamos llamando recursivamente a la funcion pasando por las casillas adyacentes
            recorrer(tablero, fila, columna + 1);
            recorrer(tablero, fila, columna - 1);
            recorrer(tablero, fila + 1, columna);
            recorrer(tablero, fila - 1, columna);
            recorrer(tablero, fila - 1, columna - 1);
            recorrer(tablero, fila - 1, columna + 1);
            recorrer(tablero, fila + 1, columna + 1);
            recorrer(tablero, fila + 1, columna - 1);

        } else {
            // Si no es 0 puede que sea x u otro numero que no sea 0
            // Entonces solo si el número es entre 1 y 8 hacemos lo siguiente
            if (tablero[fila][columna] >= 1 && tablero[fila][columna] <= 8) {
                document.getElementById("celda" + fila + "" + columna).textContent = tablero[fila][columna]; // Se escribe las minas adyacentes que hay
                document.getElementById("celda" + fila + "" + columna).classList.add("verde");   // Se pone el fondo verde
                document.getElementById("celda" + fila + "" + columna).classList.remove("gris"); // Se quita el fondo gris
            }
        }
    }
}

// Evento que se ejecutará al hacer click en una casilla
document.getElementById("container").addEventListener("click", evento => {

    // Si se a clickado en una etiqueta span y el estado es true (que significa que la partida esta activa)
    if (evento.target.tagName == "SPAN" && estado) {
        // Guardamos la posición de la casilla que se a pulsado
        const fila = parseInt(evento.target.dataset.fila);
        const columna = parseInt(evento.target.dataset.columna);

        // Si la casilla es gris entonces la podemos destapar
        if (document.getElementById("celda" + fila + "" + columna).classList.contains("gris")) {
            destapar(tablero, fila, columna, evento);
        }
    }
})



// Llamamos a las funciones para crear el tablero con sus minas
const tablero = crearTablero();
ponerMinas(tablero);
ponerMinasAdyacentes(tablero)

// Mostramos el tablero
mostrarTablero();

// Console para mostrar el tablero en consola en forma de tabla
console.table(tablero);