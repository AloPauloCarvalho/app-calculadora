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

  function handleOperationResult(arr) {
    setNumOperationResult(() => {
      // 3 - último index ser um operador

      let result = arr[0];
      for (let i = 1; i < arr.length - 2; i += 2) {
        switch (arr[i]) {
          case '+':
            result += arr[i + 1];
            break;
          case '-':
            result -= arr[i + 1];
            break;
          case '*':
            result += arr[i + 1];
            break;
          case '/':
            result += arr[i + 1];
            break;
        }
      }

      return result;
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
