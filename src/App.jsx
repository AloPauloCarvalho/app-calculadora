import { useState } from 'react'
import './App.css'

function App() {
  const [arrOperatorMemory, setArrOperatorMemory] = useState([]);
  const [numOperationResult, setNumOperationResult] = useState(0);
  const [numResultSetted, setNumResultSetted] = useState(false);

  // 0- função responsável por tratar os inputs do usuário e organizar a expressão que será executada
  function handleOperationInput(input) {
    setArrOperatorMemory((arr) => {

      // 1- primeiro input não pode ser um operador
      if ((arr.length === 0 && !Number.isInteger(input))) {
        return arr;
      }

      // 1.5 - se existir resultado de uma conta prévia e o input for um operador
      if ((numOperationResult != 0 && !Number.isInteger(input))) {
        return [numOperationResult, input];
      }

      // 2- não podem existir dois operadores seguidos
      if (!Number.isInteger(input) && !Number.isInteger(arr[arr.length - 1])) {
        const tempArr = [...arr];
        tempArr[tempArr.length - 1] = input;
        return tempArr;
      }


      // NAO ESTA FUNCIONANDO QUANDO DÁ RODA DA OPERAÇÃO ELE AINDA CONCATENA NUMERO NA MEMORIA QUANDO ESSA PARTE DEVERIA ESTAR BLOQUEADA 
      // 3- caso o último input seja um número e input anterior também, concatena esse input com o número anterior
      if (Number.isInteger(input) && numResultSetted) {
        if (arr.length > 0 && Number.isInteger(arr[arr.length - 1])) {
          const tempArr = [...arr];
          tempArr[tempArr.length - 1] = (tempArr[tempArr.length - 1] * 10) + input;
          setNumResultSetted(false);
          return tempArr;
        }
      }

      // 4- caso seja o primeiro input ou seja um input de operador, adiciona novo index a expressão
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
    setNumResultSetted(true);
    setNumOperationResult(() => {
      let tempArr = [...arr];

      // 1- último index não pode ser um operador
      if (!Number.isInteger(tempArr[tempArr.length - 1])) {
        tempArr.pop();
      }

      // 2- operadores de multiplicação e divisão
      for (let i = 0; i < tempArr.length; i++) {
        if (['*', '/'].includes(tempArr[i])) {
          tempArr.splice(i - 1, 3, calcular(tempArr[i - 1], tempArr[i + 1], tempArr[i]));
          i--;
        }
      }

      // 3- operadores de soma e subtração
      for (let i = 0; i < tempArr.length; i++) {
        if (['+', '-'].includes(tempArr[i])) {
          tempArr.splice(i - 1, 3, calcular(tempArr[i - 1], tempArr[i + 1], tempArr[i]));
          i--;
        }
      }

      // 4- retorna resultado tratando casos de float/dizima periodica
      if (Number.isFinite(tempArr[0]) && tempArr[0] % 1 !== 0) {
        return tempArr[0].toLocaleString(undefined, { maximumFractionDigits: 3, minimumFractionDigits: 0 });
      } //roubei do stackoverflow e tá dando merda

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
          onClick={() => { setArrOperatorMemory([]); setNumOperationResult(0) }}>
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
