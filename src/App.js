import { useState } from "react";

function Square({ value, status, onSquareClick }) {
  //const [value, setValue] = useState(null); //State para el valor del cuadro
  //const [status, setStatus] = useState(false); //State de apoyo para indicar que
  //ya se presiono este mismo cuadro

  /*function handleClick() {
    setValue("X");
    setStatus(true);
  }*/

  return (
    <button
      className="square comic-neue-regular"
      //onClick={handleClick}
      disabled={status}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [statuses, setStatuses] = useState(Array(9).fill(false));
  const [sigueX, setSigueX] = useState(true);
  //iniciaremos con X, será como un switch para indicar que símbolo sigue

  function handleClick(i) {
    //Si no hubiera colocado lo del botón deshabilitado, entonces
    //se podría actualizar varias veces, para evitar esto
    //los autores decidierón validar si el cuadrado ya tenía valor
    //Sí ya tenía, no sigue la ejecución, evitando así actualizar
    //de por gusto
    if (squares[i] || calculateWinner(squares)) {
      //regresa antes también si ya se ha terminado el juego
      return;
    }
    //función utilizada para actualizar los states, usando arrow functions
    const nextSquares = squares.slice();
    //determino si sigue X o O
    if (sigueX) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    //y seteamos el estado para que cambie de símbolo
    setSigueX(!sigueX);

    //status update
    const nextStatuses = statuses.slice(); //copia del array
    nextStatuses[i] = true; //para deshabilitar el cuadrado marcado
    setStatuses(nextStatuses); //para actualizar los estados
    //es posible que por tener los useState separados, este causando un
    //doble renderizado en cada ejecución (click en botón)
    //por lo tanto, quizá debería ver si se puede hacer como un objeto
    //ej: {squares: array de squares, statuses: array de statuses}
  }
  //Agregamos un segmento para indicar al ganador
  const ganador = calculateWinner(squares);
  let status;
  if (ganador) {
    //si ya hay un ganador colocado
    status = "El ganador es: " + ganador;
    //porque retornamos el símbolo ganador
  } else {
    status = "El siguiente turno es de: " + (sigueX ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          status={statuses[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          status={statuses[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          status={statuses[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          status={statuses[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          status={statuses[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          status={statuses[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          status={statuses[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          status={statuses[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          status={statuses[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

//Agregamos una función para identificar si alguien ya gano
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; //indica que líneas se marcan para declarar victoria
  //y la función validará si hay tres cuadros seguidos marcados con el mismo
  //signo en alguna de las líneas de victoria indicadas
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; //descompone una línea, p.ej: [0,1,2]
    //en tres valores a,b,c para usarlos como índice del tablero a comparar
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
      //se vlida que el cuadro 1 de la línea este marcado
      //se valida qu el cuadro 2 indicado en la linea sea igual al cuadro 1 indicado
      //y se valida que el cuadro 3 sea igual al cuadro 1
      //De esta forma, se valida que los 3 cuadros son iguales y se declará un ganador
      //finalmante, regresa squares[a] para indicar quien gano
    }
  }
  //si no se retorno antes es porque aun no ha ganado nadie
  return null;
}
