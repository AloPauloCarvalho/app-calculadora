import { useState } from 'react'
import './App.css'

function App() {
  const [arrOperatorMemory, setArrOperatorMemory] = useState([]);
  const [numOperationResult, setNumOperationResult] = useState(0);

  // 0- função responsável por tratar os inputs do usuário e organizar a expressão que será executada
  function handleOperationInput(input) {
    setArrOperatorMemory((arr) => {

      // 1- primeiro input não pode ser um operador
      if ((arr.length === 0 && !Number.isInteger(input))) {
        return arr;
      }

      // 2- não podem existir dois operadores seguidos
      if (!Number.isInteger(input) && !Number.isInteger(arr[arr.length - 1])) {
        const tempArr = [...arr];
        tempArr[tempArr.length - 1] = input;
        return tempArr;
      }

      // 3- caso o último input seja um número e input anterior também, concatena esse número com input anterior
      if (Number.isInteger(input)) {
        if (arr.length > 0 && Number.isInteger(arr[arr.length - 1])) {
          const tempArr = [...arr];
          tempArr[tempArr.length - 1] = (tempArr[tempArr.length - 1] * 10) + input;
          return tempArr;
        }
      }

      // 4- caso seja o primeiro input ou seja um operador, adiciona novo index a expressão
      return [...arr, input];
    });

    console.log(arrOperatorMemory);
  }


  //0 - função que calcula 
  function calcular(x, y, operator) {
    switch (operator) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        if (y === 0) {
          //exibir erro no display de resultado
          throw new Error('Err');
        }
        return x / y;
    }
  }

  // 0- função que executa a expressão armazenada no arrOperatorMemory
  function handleOperationResult(arr) {
    setNumOperationResult(() => {
      let tempArr = [...arr];

      // 0- último index não pode ser um operador
      if (!Number.isInteger(tempArr[tempArr.length - 1])) {
        tempArr.pop();
      }

      // 1- operadores de multiplicação e divisão
      for (let i = 0; i < tempArr.length; i++) {
        if (['*', '/'].includes(tempArr[i])) {
          tempArr.splice(i-1, 3, calcular(tempArr[i-1], tempArr[i+1], tempArr[i]));
          i--;
        }
      }

      // 2- operadores de soma e subtração
      for (let i = 0; i < tempArr.length; i++) {
        if (['+', '-'].includes(tempArr[i])) {
          tempArr.splice(i-1, 3, calcular(tempArr[i-1], tempArr[i+1], tempArr[i]));
          i--;
        }
      }

      console.log(tempArr)
      return tempArr[0];
    })
  }

  return (
    <>
      <h2>{...arrOperatorMemory}</h2>
      <h1>{numOperationResult}</h1>

      <div className="card">
        {[...Array(10).keys()].map((numInput) => (
          <button
            key={numInput}
            type='button'
            onClick={() => handleOperationInput(numInput)}
          >
            {numInput}
          </button>
        ))}
      </div>

      <div>
        {['+', '-', '*', '/'].map((operatorInput) => (
          <button
            key={operatorInput}
            type='button'
            onClick={() => handleOperationInput(operatorInput)}
          >
            {operatorInput}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={() => setArrOperatorMemory([])}>
          Clear
        </button>
        <button
          onClick={() => handleOperationResult(arrOperatorMemory)}>
          =
        </button>
      </div>

    </>
  )
}

export default App
